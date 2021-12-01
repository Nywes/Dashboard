import React, { Component, useState } from 'react';
import api from '../api';
import styles from "../style/QuoteWidget.module.css";
import Select from 'react-select';

class QuoteWidget extends Component {

    options = [];

    constructor(props) {
        super(props);

        this.options = [
            { label: "Business", value: "business" },
            { label: "Education", value: "education" },
            { label: "Faith", value: "faith" },
            { label: "Famous", value: "famous-quotes" },
            { label: "Friendship", value: "friendship" },
            { label: "Future", value: "future" },
            { label: "Happiness", value: "happiness" },
            { label: "History", value: "history" },
            { label: "Inspirational", value: "inspirational" },
            { label: "Life", value: "life" },
            { label: "Literature", value: "literature" },
            { label: "Love", value: "love" },
            { label: "Nature", value: "nature" },
            { label: "Politics", value: "politics" },
            { label: "Proverbs", value: "proverb" },
            { label: "Religion", value: "religion" },
            { label: "Science", value: "science" },
            { label: "Technology", value: "technology" },
            { label: "Wisdom", value: "wisdom" }
        ]

        this.state = {
            selection: '',
            selectionLabel: '',
            possibleQuotes: [],
            currentQuote: "Lorem ipsum...",
            currentAuthor: "JuL"
        }
    }

    handleThemeInput = async event => {
        this.setState({ selection: event.value, selectionLabel: event.label });

        console.log("Sending theme: " + event.value);
        await api.searchQuoteByTag(event.value)
        .then(res => {
            if (res.status === 200) {

                console.log("Got quotes", res.data.quotes);

                var quotesRotation = [];

                for (let i = 0; i < res.data.quotes.results.length; i++) {
                    const element = res.data.quotes.results[i];


                    quotesRotation.push({quote: element.content, author: element.author});
                }

                console.log("Quotes rotation length ", quotesRotation.length)
                var randomIndex = Math.floor(Math.random() * quotesRotation.length);
                console.log("Got random index: ", randomIndex);

                this.setState({
                    possibleQuotes: quotesRotation,
                    currentQuote: quotesRotation[randomIndex].quote,
                    currentAuthor: quotesRotation[randomIndex].author,
                })

            } else {
                alert("Invalid request");
            }
        })
        .catch(err => {
            alert("Invalid request");
        });
    }

    render() {

        const { selection, selectionLabel, currentQuote, currentAuthor } = this.state;

        return (
            <div className={this.props.widgetStyle}>
                <Select
                    placeholder={selectionLabel}
                    options={this.options}
                    className={styles.FirstBar}
                    value={selection}
                    onChange={this.handleThemeInput}
                />
                <p className={styles.text}>
                    {currentQuote}
                </p>
                <p className={styles.author}>
                   {currentAuthor}
                </p>
                <input type="checkbox" onClick={() => this.props.SelectWidget(this.props.WidgetID)} className={styles.Quit}></input>
            </div>
        )

    }
}

export { QuoteWidget }