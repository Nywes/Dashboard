import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { AccountCircle, Widgets } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import styles from "../style/HomePage.module.css"
import { fontSize } from '@mui/system';

class LogoButton extends Component {
    render() {
        return (
            <Link to={this.props.path}>
                <this.props.icon sx={{ color: grey[900], fontSize: 60, padding: 0.8 }}/>
            </Link>
        )
    }
}

class HeaderHomePage extends Component {
    render() {
        return (
            <header className={styles.HeaderHomePage}>
                <LogoButton path={ '/' } icon={Widgets}/>
                <LogoButton path={ '/login' } icon={AccountCircle}/>
            </header>
        )
    }
}

export {HeaderHomePage}