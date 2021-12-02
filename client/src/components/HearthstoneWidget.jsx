import React, { Component, useState } from 'react';
import api from '../api';
import styles from "../style/HearthstoneWidget.module.css";
import selector from "../style/SelectButton.module.css";
import Select, { components } from 'react-select';
import HearthstoneLogo from '../img/hearthstoneLogo.png';
import textBg from '../img/wood_planch_bg.png';

class HearthstoneWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchWord: '',
            cardImage: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/cf014c0c9363f70cb7e4f7f7c4086ab42bc5d2afecf421f35b9c87c81943d9d4.png',
            cardFlavor: "At least he has Angry Chicken."
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
                    placeholder="Search a card ..."
                    className={styles.SearchBar}
                    value={searchWord}
                    onChange={this.handleSearchBarInput}
                    onKeyPress={this.handleKeyPress}
                />
                <p className={styles.cardDescription}>
                    {cardFlavor}
                </p>
                <img src={cardImage} className={styles.cardImage}/>
                <input type="checkbox" onClick={() => this.props.SelectWidget(this.props.WidgetID)} className={selector.button}></input>
            </div>
        )

    }
}

export { HearthstoneWidget }