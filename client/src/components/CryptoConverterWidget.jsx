import React, { Component, useState } from 'react';
import api from '../api';
import styles from "../style/CryptoWidget.module.css";
import Select from 'react-select';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const webSocketPort = process.env.REACT_APP_WEBSOCKET_PORT;
const client = new W3CWebSocket(`ws://127.0.0.1:${webSocketPort}`);

class CryptoConverterWidget extends Component {

    //options = [];

    constructor(props) {
        super(props);

        this.state = {
            searchWord: '',
            amountToConvert: '1',
            firstComparator: 'Bitcoin (BTC)',
            firstComparatorLabel: 'Bitcoin (BTC)',
            secondComparator: 'Bitcoin (BTC)',
            secondComparatorLabel: 'Bitcoin (BTC)',
            firstComparatorResult: '1 Bitcoin (BTC)',
            secondComparatorResult: '1 Bitcoin (BTC)',
            options: []
        }
    }

    handleAmountToConvertBar = async event => {
        const amountToConvert = event.target.value;
        this.setState({ amountToConvert });
    }

    handleFirstComparatorInput = async event => {
        console.log("Event", event);
        this.setState({ firstComparator: event.value, firstComparatorLabel:event.label });

    }

    handleSecondComparatorInput = async event => {
        console.log("Event", event);
        this.setState({ secondComparator: event.value, secondComparatorLabel:event.label });
    }

    invertValues = () => {
        const firstComparator = this.state.secondComparator;
        const secondComparator = this.state.firstComparator;
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

            this.setState({
                firstComparatorResult: `${this.state.amountToConvert} ${this.state.firstComparator}`,
                secondComparatorResult: `${parseInt(this.state.amountToConvert) * parseFloat(dataFromServer.price)} ${this.state.secondComparator}`
            })
        };

        // * query server to get the options
        await api.getCurrencyOptions()
        .then(res => {
            console.log("Got options", res.data.options);
            this.setState({
                options: res.data.options
            })
        });
        // * can't really fail so no catch

    }

    convertValue = async () => {
            // * get team from name

            var params = {cryptoID: this.state.firstComparator, targetCurrencyID: this.state.secondComparator}

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
        const {amountToConvert, firstComparator, secondComparator, firstComparatorLabel, secondComparatorLabel, firstComparatorResult, secondComparatorResult, options} = this.state
        const title = "Crypto-currency converter calculator"

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
                {/* <input
                    type="text"
                    placeholder="First Value"
                    className={styles.FirstBar}
                    value={firstComparator}
                    onChange={this.handleFirstComparatorInput}
                    //onKeyPress={?} pas sur de faire quelque chose
                /> */}
                {/* //todo https://react-select.com/home */}
                <Select
                    placeholder={firstComparatorLabel}
                    options={options}
                    className={styles.FirstBar}
                    value={firstComparatorLabel}
                    onChange={this.handleFirstComparatorInput}
                />

                <Select
                    placeholder={secondComparatorLabel}
                    options={options}
                    className={styles.SecondBar}
                    value={secondComparatorLabel}
                    onChange={this.handleSecondComparatorInput}
                />
                {/* <input
                    type="text"
                    placeholder="Second Value"
                    className={styles.SecondBar}
                    value={secondComparator}
                    onChange={this.handleSecondComparatorInput}
                    //onKeyPress={?} pas sur de faire quelque chose
                /> */}
                <input
                    type="button"
                    placeholder="="
                    className={styles.InvertButton}
                    value="⇆"
                    onClick={this.invertValues}
                />
                <p className={styles.FirstComparator}>
                    {firstComparatorResult}
                </p>
                <p className={styles.Equal}>
                    =
                </p>
                <p className={styles.SecondComparator}>
                    {`${Math.round((parseFloat(secondComparatorResult) + Number.EPSILON) * 100) / 100} ${secondComparatorLabel}`}
                </p>
                <button
                    type="submit"
                    placeholder="="
                    className={styles.ValidateButton}
                    onClick={this.convertValue}
                />
            </div>
        )
    }
}

export { CryptoConverterWidget }