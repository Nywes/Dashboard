import React, { Component, useState } from 'react';
import api from '../api';
import styles from "../style/HearthstoneWidget.module.css";
import Select, { components } from 'react-select';
import HearthstoneLogo from '../img/hearthstoneLogo.png';
import textBg from '../img/wood_planch_bg.png';

class HearthstoneWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchWord: '',
            cardImage: 'https://www.hearthstone-decks.com/upload/carte/59.jpg',
            cardFlavor: "Au moins, il a un poulet furieux"
        }
    }

    handleKeyPress = async event => {
        if (event.key === 'Enter') {

            // * get hearthstone card
            await api.searchCard(event.target.value)
            .then(res => {
                if (res.status === 200) {
                    // todo model creation would go here
                    console.log("Got card");

                    this.setState({
                        cardImage: res.data.card[0].img,
                        cardFlavor: res.data.card[0].flavor
                    })
                } else {
                    alert("No card found");

                    this.setState({
                        searchWord: ''
                    })
                }
            })
            .catch(err => {
                alert("No card found");
                console.log("Error " + err);
            });
        }
    }

    handleSearchBarInput = async event => {
        const searchWord = event.target.value;
        this.setState({ searchWord });
    }

    render() {

        const { searchWord, cardImage, cardFlavor } = this.state;

        return (
            <div className={this.props.widgetStyle}>
                <img src={HearthstoneLogo} className={styles.HSLogo} />
                <input
                    type="text"
                    placeholder="Search..."
                    className={styles.SearchBar}
                    value={searchWord}
                    onChange={this.handleSearchBarInput}
                    onKeyPress={this.handleKeyPress}
                />
                <p className={styles.cardDescription}>
                    {cardFlavor}
                </p>
                <img src={cardImage} className={styles.cardImage}/>
                <input type="checkbox" onClick={() => this.props.SelectWidget(this.props.WidgetID)} className={styles.Quit}></input>
            </div>
        )

    }
}

export { HearthstoneWidget }