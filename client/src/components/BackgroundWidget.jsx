import React, { Component, useState } from 'react';
import api from '../api';
import styles from "../style/BackgroundWidget.module.css";
import Select from 'react-select';
import { style } from '@mui/system';

class BackgroundWidget extends Component {

    constructor(props) {
        super(props);
        var imgLink1 = `https://www.costarica-voyage.com/wp-content/uploads/foret-riviere-1280x800.jpg`;
        var imgLink2 = `https://img.myloview.fr/images/le-chemin-mene-a-la-foret-enneigee-700-80082915.jpg`;
        var imgLink3 = `https://i2.wp.com/destinationjapon.fr/wp-content/uploads/2019/07/fukushima_gunma_oze_park.jpg`;
        this.state = {
            searchWord: '',
            currentIndex: 1,
            receiptImg: [imgLink1, imgLink2, imgLink3],
            currentImg: 'https://www.costarica-voyage.com/wp-content/uploads/foret-riviere-1280x800.jpg',
        }
    }

    handleKeyPress = async event => {
        if (event.key === 'Enter') {

            // * get team from name
            await api.searchPictures(event.target.value)
            .then(res => {
                if (res.status === 200) {
                    // todo model creation would go here, to hold author name etc
                    console.log("Got images");

                    var imageUrls = [];

                    for (let i = 0; i < res.data.pictures.length; i++) {
                        const element = res.data.pictures[i].url;

                        imageUrls.push(element);
                    }

                    this.setState({
                        receiptImg: imageUrls,
                        currentIndex: 0,
                        currentImg: imageUrls[0]
                    });

                } else {
                    alert("No images found");

                    this.setState({
                        searchWord: ''
                    })
                }
            })
            .catch(err => {
                alert("No images found");
                console.log("Error " + err);
            });
        }

    }

    handleSearchBarInput = async event => {
        const searchWord = event.target.value;
        this.setState({ searchWord });
    }

    changeToLeftImg = () => {
        if (this.state.currentIndex > 0)
            this.setState({
                currentIndex: this.state.currentIndex - 1,
                currentImg: this.state.receiptImg[this.state.currentIndex],
            })
        else
            this.setState({
                currentIndex: this.state.receiptImg.length - 1,
                currentImg: this.state.receiptImg[this.state.currentIndex],
            })
    }

    changeToRightImg = () => {
        if (this.state.currentIndex < this.state.receiptImg.length - 1)
            this.setState({
                currentIndex: this.state.currentIndex + 1,
                currentImg: this.state.receiptImg[this.state.currentIndex],
            })
        else
            this.setState({
                currentIndex: 0,
                currentImg: this.state.receiptImg[this.state.currentIndex],
            })
    }

    render() {
        const title = "Small Title please";
        const { searchWord, currentImg } = this.state;
        //<img src={imgLink1} className={styles.Img}/>

        return (
            <div className={this.props.widgetStyle}>
                <input
                    type="text"
                    placeholder="Search..."
                    className={styles.SearchBar}
                    value={searchWord}
                    onChange={this.handleSearchBarInput}
                    onKeyPress={this.handleKeyPress}
                />
                <p className={styles.Title}>
                    {title}
                </p>
                <button
                    className={styles.leftButton}
                    onClick={this.changeToLeftImg}
                >&lt;</button>
                <img src={currentImg} className={styles.Img}/>
                <button
                    className={styles.rightButton}
                    onClick={this.changeToRightImg}
                >&gt;</button>
            </div>
        )
    }
}

export { BackgroundWidget }