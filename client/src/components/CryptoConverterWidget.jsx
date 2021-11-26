import React, { Component, useState } from 'react';
import api from '../api';
import styles from "../style/CryptoWidget.module.css";

class CryptoConverterWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchWord: '',
            amountToConvert: '1',
            firstComparator: 'Bitcoin (BTC)',
            secondComparator: 'Bitcoin (BTC)',
            firstComparatorResult: '1 Bitcoin (BTC)',
            secondComparatorResult: '1 Bitcoin (BTC)',
        }
    }

    handleAmountToConvertBar = async event => {
        const amountToConvert = event.target.value;
        this.setState({ amountToConvert });
    }

    handleFirstComparatorInput = async event => {
        const firstComparator = event.target.value;
        this.setState({ firstComparator });
    }

    handleSecondComparatorInput = async event => {
        const secondComparator = event.target.value;
        this.setState({ secondComparator });
    }

    invertValues = () => {
        const firstComparator = this.state.secondComparator;
        const secondComparator = this.state.firstComparator;
        this.setState({ firstComparator: firstComparator, secondComparator: secondComparator });
    }

    render() {
        const {amountToConvert, firstComparator, secondComparator, firstComparatorResult, secondComparatorResult} = this.state
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
                <input
                    type="text"
                    placeholder="First Value"
                    className={styles.FirstBar}
                    value={firstComparator}
                    onChange={this.handleFirstComparatorInput}
                    //onKeyPress={?} pas sur de faire quelque chose
                />
                <input
                    type="text"
                    placeholder="Second Value"
                    className={styles.SecondBar}
                    value={secondComparator}
                    onChange={this.handleSecondComparatorInput}
                    //onKeyPress={?} pas sur de faire quelque chose
                />
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
                    {secondComparatorResult}
                </p>
                <button
                    type="submit"
                    placeholder="="
                    className={styles.ValidateButton}
                />
            </div>
        )
    }
}

export { CryptoConverterWidget }