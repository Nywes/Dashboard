import React, { Component, useState } from 'react';
import api from '../api';
import styles from "../style/CryptoWidget.module.css";
import selector from "../style/SelectButton.module.css";
import Select from 'react-select';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const serverHostName = process.env.REACT_APP_SERVER_HOST;
var clientPort = process.env.REACT_APP_CLIENT_PORT;

const webSocketPort = process.env.REACT_APP_WEBSOCKET_PORT;
//const client = new W3CWebSocket(`ws://${serverHostName}:${webSocketPort}`);
const client = new W3CWebSocket(`ws://localhost:${clientPort}/cryptosocket`);

class CryptoConverterWidget extends Component {

    tickerOptions = [];

    currentTickerInterval = null;

    constructor(props) {
        super(props);

        // * nomics updates every 10 seconds!
        // *https://nomics.com/docs/#section/Authentication
        this.tickerOptions = [
            { label: "10 Seconds", value: 10000 },
            { label: "30 Seconds", value: 30000 },
            { label: "1 Minute", value: 60000 },
            { label: "5 Minutes", value: 300000 },
            { label: "10 Minutes", value: 600000 },
        ];

        // * default 1 minute
        this.currentTickerInterval = setInterval(this.updateValues, 60000);

        this.state = {
            searchWord: '',
            amountToConvert: '1',
            firstComparator: 'Bitcoin (BTC)',
            firstComparatorLabel: 'Bitcoin (BTC)',
            secondComparator: 'Bitcoin (BTC)',
            secondComparatorLabel: 'Bitcoin (BTC)',
            firstComparatorResult: '1 Bitcoin (BTC)',
            secondComparatorResult: '1 Bitcoin (BTC)',
            currentTickerValue: 60000,
            currentTickerLabel: "1 Minute",
            options: [],
            cryptoOptions: []
        }
    }

    handleAmountToConvertBar = async event => {
        const amountToConvert = event.target.value;
        this.setState({ amountToConvert });
    }

    handleFirstComparatorInput = async event => {
        console.log("Event", event);
        this.setState({ firstComparator: event.value, firstComparatorLabel: event.label });

    }

    handleTickerInput = async event => {
        console.log("Event", event);

        clearInterval(this.currentTickerInterval);
        this.currentTickerInterval = setInterval(this.updateValues, event.value);
        this.setState({
            currentTickerValue: event.value,
            currentTickerLabel: event.label
        });
    }

    handleSecondComparatorInput = async event => {
        console.log("Event", event);
        this.setState({ secondComparator: event.value, secondComparatorLabel:event.label });
    }

    invertValues = () => {
        const firstComparator = this.state.secondComparator;
        const secondComparator = this.state.firstComparator;

        console.log("First comp: ", firstComparator);
        console.log("Second comp: ", secondComparator);

        this.setState({ firstComparator: firstComparator, secondComparator: secondComparator });

        this.updateValues();
    }

    updateValues = async () => {

        client.send(JSON.stringify({
            currencyA: this.state.firstComparator,
            currencyB: this.state.secondComparator
        }));
    }

    componentDidMount = async () => {

        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
            console.log("Message from server ", JSON.parse(message.data));
            const dataFromServer = JSON.parse(message.data);

            console.log("Second comparator:", this.state.secondComparator);

            this.setState({
                firstComparatorResult: `${this.state.amountToConvert} ${this.state.firstComparator}`,
                secondComparatorResult: `${parseInt(this.state.amountToConvert) * parseFloat(dataFromServer.price)} ${this.state.secondComparator}`
            });
        };

        // * query server to get the options
        await api.getCurrencyOptions()
        .then(res => {
            console.log("Got options", res.data.options);
            this.setState({
                options: res.data.options
            })
        });
        await api.getOnlyCryptoOptions()
        .then(res => {
            console.log("Got options", res.data.options);
            this.setState({
                cryptoOptions: res.data.options
            })
        });

        // * can't really fail so no catch
    }

    convertValue = async () => {
            // * get team from name

            var params = {cryptoID: this.state.firstComparator, targetCurrencyID: this.state.secondComparator}

            console.log(`Converting: ${params.cryptoID} to ${params.targetCurrencyID}`);
            await api.getCryptoValue(params)
            .then(res => {
                if (res.status === 200) {

                    var cryptoData = res.data.data;
                    // todo here you would create a crypto model taking cryptoData as its constructor!

                    console.log("Got crypto data", cryptoData);
                    this.setState({
                        firstComparatorResult: `${this.state.amountToConvert} ${this.state.firstComparator}`,
                        // ! may need to round this or something
                        secondComparatorResult: `${parseInt(this.state.amountToConvert) * parseFloat(cryptoData[0].price)} ${this.state.secondComparator}`
                    })
                } else {
                    alert("Error");

                    this.setState({
                        firstComparator: "",
                        secondComparator: "",
                        firstComparatorResult: "-",
                        secondComparatorResult: "-"
                    })
                }
            })
            .catch(err => {
                alert("Invalid currency");
                console.log("Error " + err);
                this.setState({
                    firstComparator: "",
                    secondComparator: "",
                    firstComparatorResult: "-",
                    secondComparatorResult: "-"
                })
            });
            console.log("After await");
    }

    render() {
        const {cryptoOptions, currentTickerValue, currentTickerLabel, amountToConvert, firstComparator, secondComparator, firstComparatorLabel, secondComparatorLabel, firstComparatorResult, secondComparatorResult, options} = this.state
        const title = "Crypto-currency converter calculator"

        const colourStyles = {
            placeholder: (defaultStyles) => {
                return {
                    ...defaultStyles,
                    color: 'white',
                    textShadow: '0 0 15px white',
                    fontWeight: 700,
                }
            },
            control: styles => ({ ...styles,
                backgroundColor: 'transparent',
                borderRadius: '10px',
                border: '3px solid rgb(0, 180, 230)',
                boxShadow: '0 0 15px -1px rgb(0, 180, 230), 0 0 12px -1px rgb(0, 180, 230) inset',
                color: 'black',
            }),
            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
              return {
                ...styles,
                backgroundColor: isDisabled ? 'red' : 'transparent',
                cursor: isDisabled ? 'not-allowed' : 'default',
                color: 'black',
              };
            },
        };

        return (
            <div className={this.props.widgetStyle}>
                <p className={styles.Title}>
                    {title}
                </p>
                <input
                    type="text"
                    placeholder="Enter amount to convert"
                    className={styles.ValueBar}
                    value={amountToConvert}
                    onChange={this.handleAmountToConvertBar}
                    //onKeyPress={?} pas sur de faire quelque chose
                />
                <Select
                    placeholder={currentTickerLabel}
                    options={this.tickerOptions}
                    className={styles.Minutes}
                    styles={colourStyles}
                    value={currentTickerValue}
                    onChange={this.handleTickerInput}
                />

                <Select
                    placeholder={firstComparatorLabel}
                    options={cryptoOptions}
                    className={styles.FirstBar}
                    styles={colourStyles}
                    value={firstComparatorLabel}
                    onChange={this.handleFirstComparatorInput}
                />
                <Select
                    placeholder={secondComparatorLabel}
                    options={options}
                    className={styles.SecondBar}
                    styles={colourStyles}
                    value={secondComparatorLabel}
                    onChange={this.handleSecondComparatorInput}
                />
                <p className={styles.FirstComparator}>
                    {firstComparatorResult}
                </p>
                <p className={styles.Equal}>
                    =
                </p>
                <p className={styles.SecondComparator}>
                    {`${Math.round((parseFloat(secondComparatorResult) + Number.EPSILON) * 100) / 100} ${secondComparator}`}
                </p>
                <button
                    type="submit"
                    placeholder="="
                    className={styles.ValidateButton}
                    onClick={this.convertValue}
                >Validate</button>
                <input type="checkbox" onClick={() => this.props.SelectWidget(this.props.WidgetID)} className={selector.button}></input>
            </div>
        )
    }
}

export { CryptoConverterWidget }