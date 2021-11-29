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
            hearthstoneLogo: HearthstoneLogo,
            cardImage: 'https://www.hearthstone-decks.com/upload/carte/59.jpg',
        }
    }

    handleSearchBarInput = async event => {
        const searchWord = event.target.value;
        this.setState({ searchWord });
    }

    render() {

        const { searchWord, hearthstoneLogo, cardImage } = this.state;

        return (
            <div className={this.props.widgetStyle}>
                <img src={this.state.hearthstoneLogo} className={styles.HSLogo} />
                <input
                    type="text"
                    placeholder="Search..."
                    className={styles.SearchBar}
                    value={searchWord}
                    onChange={this.handleSearchBarInput}
                />
                <p className={styles.cardDescription}>
                    "Au moins, il a un poulet furieux."
                </p>
                <img src={cardImage} className={styles.cardImage}/>
            </div>
        )

    }
}

export { HearthstoneWidget }