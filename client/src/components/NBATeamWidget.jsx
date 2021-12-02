import React, { Component, useState } from 'react';
import styles from "../style/NBAWidgets.module.css";
import api from '../api';
import { height } from '@mui/system';
import Select from 'react-select';

class NBATeamWidget extends Component {

    teamOptions = [];

    constructor(props) {
        super(props);

        this.teamOptions = [
            {label: "Atlanta Hawks", value: "hawks"},
            {label: "Boston Celtics", value: "celtics"},
            {label: "Brooklyn Nets", value: "nets"},
            {label: "Charlotte Hornets", value: "hornets"},
            {label: "Chicago Bulls", value: "bulls"},
            {label: "Cleveland Cavaliers", value: "cavaliers"},
            {label: "Dallas Mavericks", value: "mavericks"},
            {label: "Denver Nuggets", value: "nuggets"},
            {label: "Detroit Pistons", value: "pistons"},
            {label: "San Francisco Warriors", value: "warriors"},
            {label: "Houston Rockets", value: "rockets"},
            {label: "Indiana Pacers", value: "pacers"},
            {label: "L.A. Clippers", value: "Clippers"},
            {label: "L.A. Lakers", value: "Lakers"},
            {label: "Memphis Grizzlies", value: "Grizzlies"},
            {label: "Miami Heat", value: "Heat"},
            {label: "Milwaukee Bucks", value: "Bucks"},
            {label: "Minnesota Timberwolves", value: "Timberwolves"},
            {label: "New Orleans Pelicans", value: "Pelicans"},
            {label: "New York Knicks", value: "Knicks"},
            {label: "Oklahoma City Thunder", value: "Thunder"},
            {label: "Orlando Magic", value: "Magic"},
            {label: "Philadelphia Sixers", value: "Sixers"},
            {label: "Phoenix Suns", value: "Suns"},
            {label: "Portland Trail Blazers", value: "Trail Blazers"},
            {label: "Sacramento Kings", value: "Kings"},
            {label: "San Antonio Spurs", value: "Spurs"},
            {label: "Toronto Raptors", value: "Raptors"},
            {label: "Utah Jazz", value: "Jazz"},
            {label: "Washington Wizards", value: "Wizards"},
        ]

        this.state = {
            searchWord: '',
            abbreviation: "ATL",
            city: "Atlanta",
            conference: "East",
            division: "Southeast",
            full_name: "Atlanta Hawks",
            name: "Hawks",
            currentLabel: "Atlanta Hawks"
        }
    }

    handleTeamInput = async event => {
        this.setState({ currentLabel: event.label });

        await api.getNBATeam(event.value)
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
        const {currentLabel, abbreviation, city, conference, division, full_name, name, searchWord} = this.state;

        const colourStyles = {
            control: styles => ({ ...styles, 
                backgroundColor: 'transparent',
                borderRadius: '10px',
                border: '3px solid rgb(0, 180, 230)',
                boxShadow: '0 0 15px -1px rgb(0, 180, 230), 0 0 12px -1px rgb(0, 180, 230) inset',
                color: 'black,'
            }),
            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
              return {
                ...styles,
                backgroundColor: isDisabled ? 'red' : 'transparent',
                cursor: isDisabled ? 'not-allowed' : 'default',
              };
            },
        };
        var namePath = name;

        // ! attention si le site arrete d'être maintenu on est ken
        // ! si ils changent l'archi
        var imgLink = `https://fr.global.nba.com/media/img/teams/00/logos/${abbreviation}_logo.svg`;

        // * get logo from name
        return (
            <div className={this.props.widgetStyle}>
                {/* <input
                    type="text"
                    placeholder="Search a NBA team..."
                    className={styles.SearchBar}
                    value={searchWord}
                    onChange={this.handleSearchBarInput}
                    onKeyPress={this.handleKeyPress}
                /> */}
                <Select
                    placeholder={currentLabel}
                    options={this.teamOptions}
                    styles={colourStyles}
                    value={currentLabel}
                    onChange={this.handleTeamInput}
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