import React, { Component, useState } from 'react';
import styles from "../style/NBAWidgets.module.css";
import api from '../api';
import { height } from '@mui/system';

class NBATeamWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchWord: '',
            abbreviation: "ATL",
            city: "Atlanta",
            conference: "East",
            division: "Southeast",
            full_name: "Atlanta Hawks",
            name: "Hawks"
        }
    }

    handleSearchBarInput = async event => {
        const searchWord = event.target.value;
        this.setState({ searchWord });

    }

    handleKeyPress = async event => {

        if (event.key === 'Enter') {

            // * get team from name
            await api.getNBATeam(event.target.value)
            .then(res => {
                if (res.status === 200) {

                    var teamData = res.data.team;

                    console.log("Got team data", teamData);
                    this.setState({
                        searchWord: '',
                        abbreviation: teamData.abbreviation,
                        city: teamData.city,
                        conference: teamData.conference,
                        division: teamData.division,
                        full_name: teamData.full_name,
                        name: teamData.name
                    });

                } else {
                    alert("No team found");

                    this.setState({
                        searchWord: ''
                    })
                }
            })
            .catch(err => {
                alert("No team found");
                console.log("Error " + err);
            });
            console.log("After await");
        }

        // * figure out how to make a loading animation while you wait

    }

    componentWillUnmount()
    {
    }

    render() {
        // * get state
        const {abbreviation, city, conference, division, full_name, name, searchWord} = this.state;

        var namePath = name;

        // ! attention si le site d'être maintenu on est ken
        // ! si ils changent l'archi
        var imgLink = `https://fr.global.nba.com/media/img/teams/00/logos/${abbreviation}_logo.svg`;

        // * get logo from name
        return (
            <div className={this.props.widgetStyle}>
                <input
                    type="text"
                    placeholder="Search a NBA team..."
                    className={styles.SearchBar}
                    value={searchWord}
                    onChange={this.handleSearchBarInput}
                    onKeyPress={this.handleKeyPress}
                />
                <img src={imgLink} className={styles.NBATeamLogo} style={{width: "12vw", height:"17vh"}}/>
                <ul className={styles.NBATeamInfo}>
                    <p>City: {city}</p>
                    <p>Name: {name}</p>
                    <p>Abbreviation: {abbreviation}</p>
                    <p>Conference: {conference}</p>
                    <p>Division: {division}</p>
                    <p className={styles.NBAFullName}>Full name: {full_name}</p>
                </ul>
                <input type="checkbox" onClick={() => this.props.SelectWidget(this.props.WidgetID)} className={styles.Quit}></input>
            </div>
        )
    }
}

export { NBATeamWidget }