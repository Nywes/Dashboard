import React, { Component, useState } from 'react';
import api from '../api';
import styles from "../style/CryptoWidget.module.css";

class CryptoConverterWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchWord: '',
            firstComparator: '1 Bitcoin (BTC)',
            secondComparator: '1 Bitcoin (BTC)',
        }
    }

    handleSearchBarInput = async event => {
        const searchWord = event.target.value;
        this.setState({ searchWord });

    }

    render() {
        const {firstComparator, secondComparator} = this.state
        const title = "Crypto-currency converter calculator"
        //getCryptoValue()
        //getCryptoValue = params => cryptoapi.get(`/currencies/`, {params: {cryptoID: params.cryptoID, targetCurrency: params.targetCurrency}});
        {}
        return (
            <div className={this.props.widgetStyle}>
                <p className={styles.Title}>
                    {title}
                </p>
                <input
                    type="text"
                    placeholder="Enter amount to convert"
                    className={styles.ValueBar}
                    value={this.state.searchWord}
                    onChange={this.handleSearchBarInput}
                    //onKeyPress={this.handleKeyPress}
                />
                <input
                    type="text"
                    placeholder="First Value"
                    className={styles.FirstBar}
                    value={this.state.searchWord}
                    onChange={this.handleSearchBarInput}
                />
                <input
                    type="text"
                    placeholder="Second Value"
                    className={styles.SecondBar}
                    value={this.state.searchWord}
                    onChange={this.handleSearchBarInput}
                />
                <input
                    type="button"
                    placeholder="="
                    className={styles.InvertButton}
                />
                <p className={styles.FirstComparator}>
                    {firstComparator}
                </p>
                <p className={styles.Equal}>
                    =
                </p>
                <p className={styles.SecondComparator}>
                    {secondComparator}
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