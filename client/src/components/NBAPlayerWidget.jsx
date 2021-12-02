import React, { Component, useState } from 'react';
import styles from "../style/NBAWidgets.module.css";
import api from '../api';

class NBAPlayerWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchWord: '',
            first_name: "Alex",
            height_feet: "6",
            height_inches: "5",
            last_name: "Caruso",
            position: "Guard",
            team_full_name: "Chicago Bulls",
            weight_pounds: "186",
            img_url: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/1040x760/1627936.png"
        }
    }

    handleSearchBarInput = async event => {
        const searchWord = event.target.value;
        this.setState({ searchWord });

    }

    handleKeyPress = async event => {

        if (event.key === 'Enter') {

            // * get team from name
            await api.getNBAPlayer(event.target.value)
            .then(async res => {
                console.log("Get nba player return ", res);
                if (res.status === 200) {

                    var player = res.data.player.data[0];
                    var position = '?';
                    switch(player.position) {
                        case 'G':
                            position = "Guard";
                            break;
                        case 'F':
                            position = "Forward";
                            break;
                        case 'C':
                            position = "Center";
                            break;
                        default:
                            break;
                    }

                    console.log("Got player data", player);
                    // todo translate position letters to actual words

                    // * fetch URL
                    await api.getNBAPlayerImageUrl(event.target.value)
                    .then(imgRes => {
                        this.setState({
                            searchWord: '',
                            first_name: player.first_name,
                            height_feet: player.height_feet === null ? "?" : player.height_feet,
                            height_inches: player.height_inches === null ? "?" : player.height_inches,
                            last_name: player.last_name,
                            position: player.position === "" ? "?" : position,
                            name: player.name,
                            team_full_name: player.team.full_name == null ? "?" : player.team.full_name,
                            weight_pounds: player.weight_pounds === null ? "?" : player.weight_pounds,
                            img_url: imgRes.data.url
                        });
                    })
                    .catch(err => {
                        this.setState({
                            searchWord: '',
                            first_name: player.first_name,
                            height_feet: player.height_feet === null ? "?" : player.height_feet,
                            height_inches: player.height_inches === null ? "?" : player.height_inches,
                            last_name: player.last_name,
                            position: player.position === "" ? "?" : position,
                            name: player.name,
                            team_full_name: player.team.full_name == null ? "?" : player.team.full_name,
                            weight_pounds: player.weight_pounds === null ? "?" : player.weight_pounds,
                            img_url: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/1040x760/logoman.png"
                        });
                    })


                } else {
                    alert("No player found");

                    this.setState({
                        searchWord: '',
                        first_name: "?",
                        height_feet: "?",
                        height_inches: "?",
                        last_name: "?",
                        position: "?",
                        name: "?",
                        weight_pounds: "?",
                        team_full_name: "?",
                        img_url: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/1040x760/logoman.png"
                    })
                }
            })
            .catch(err => {
                alert("No player found");
                console.log("Error " + err);
                this.setState({
                    searchWord: '',
                    first_name: "?",
                    height_feet: "?",
                    height_inches: "?",
                    last_name: "?",
                    position: "?",
                    name: "?",
                    weight_pounds: "?",
                    team_full_name: "?",
                    img_url: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/1040x760/logoman.png"
                })
            });
            console.log("After await");
        }

        // * figure out how to make a loading animation while you wait
    }

    render() {
        // * get state
        const {searchWord, first_name, height_feet, height_inches, last_name, position, team_full_name, weight_pounds, img_url} = this.state;

        // * get logo from name
        return (
            <div className={this.props.widgetStyle}>
                <input
                    type="text"
                    placeholder="Search a NBA player..."
                    className={styles.SearchBar}
                    value={searchWord}
                    onChange={this.handleSearchBarInput}
                    onKeyPress={this.handleKeyPress}
                />
                <div/>
                <img src={img_url} className={ styles.playerImg } style={{ width: '12vw', height: '17vh'}}/>
                <ul className={styles.NBATeamInfo}>
                    <p className={styles.NBAFullName}>Full name: {`${first_name} ${last_name}`}</p>
                    <p>Height: {height_feet === "?" ? "?" : `${height_feet}\' ${height_inches}\"`}</p>
                    <p>Position: {position}</p>
                    <p>Team: {team_full_name}</p>
                    <p>Weight: {weight_pounds} lbs</p>
                </ul>
                <input type="checkbox" onClick={() => this.props.SelectWidget(this.props.WidgetID)} className={styles.Quit}></input>
            </div>
        )
    }
}

export { NBAPlayerWidget }