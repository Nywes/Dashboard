import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { AccountCircle, Widgets, Logout, Delete } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import styles from "../style/HomePage.module.css"
import api from '../api'

class LogoButton extends Component {
    render() {
        return (
            <Link to={this.props.path}>
                <this.props.icon onClick={this.props.onClick} className={styles.HeaderIcon}/>
            </Link>
        )
    }
}

class HeaderHomePage extends Component {

    constructor({props}) {
        super(props);

        this.state = {
            loggedIn: false
        }
    }

    DeleteSession() {
        console.log("Deleting session");
        localStorage.removeItem("dashboard_jwt");

        // on veut que les prefs se réinitialisent
        window.location.reload();
    }

    componentDidMount = async () => {
        // if logged in (IE jwt_token exists, redirect to home)
        const jwt_token = localStorage.getItem('dashboard_jwt');

        if (jwt_token == null) {
            return;
        }

        console.log("validating token");
        await api.validateJWT(jwt_token)
        .then(res => {
            if (res.status === 200) {

                // if you can, redirect to home
                var isValid = res.data.validated;
                if (isValid) {
                    this.setState({
                        loggedIn: true
                    });
                }
            } else {
                console.log("Invalid token");
            }
        })
        .catch(err => {
            console.log("Error " + err);
        })
    }

    render() {

        const { loggedIn } = this.state;

        return (
            <header className={styles.HeaderHomePage}>
                <Delete onClick={() => this.props.DeleteSelectedWidgets()} className={styles.HeaderIcon}/>

                <Widgets onClick={() => this.props.toggleWidgetsButton(0)} className={styles.HeaderIcon}/>
                <button className={ styles.HeaderIcon }></button>
                {/* <ProfileButton loginPath={'/login'}/> */}

                {loggedIn ? <Logout onClick={this.DeleteSession} className={styles.HeaderIcon} /> : <LogoButton path={ '/login' } icon={AccountCircle}/>}
                {/* <LogoButton path={ '/login' } icon={AccountCircle}/> */}
            </header>
        )
    }
}

export {HeaderHomePage, LogoButton}
