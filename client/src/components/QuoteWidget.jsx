import React, { Component, useState } from 'react';
import styles from "../style/QuoteWidget.module.css";
import Select from 'react-select';

class QuoteWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comparator: '',
            comparatorLabel: '',
            options: ["aze", "rty", "uio", "pqs"],
        }
    }

    handleComparatorInput = async event => {
        this.setState({ comparator: event.value, comparatorLabel: event.label });
    }

    render() {

        const { comparator, comparatorLabel, options } = this.state;

        // ! need to handle input of the select
        return (
            <div className={this.props.widgetStyle}>
                <Select
                    placeholder={comparator}
                    options={options}
                    className={styles.FirstBar}
                    value={comparator}
                    onChange={this.handleComparatorInput}
                />
                <p className={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </p>
                <p className={styles.author}>
                JuL César
                </p>
            </div>
        )

    }
}

export { QuoteWidget }