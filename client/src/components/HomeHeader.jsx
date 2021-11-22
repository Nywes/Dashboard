import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { AccountCircle, Widgets } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import styles from "../style/HomePage.module.css"
import api from '../api'

class ProfileButton extends Component {

    DeleteSession() {
        localStorage.removeItem("dashboard_jwt");
        window.location.reload();
    }

    render() {

        var connectButton = (
            <Link to={this.props.loginPath}>
                <AccountCircle sx={{ color: grey[900], fontSize: 60, padding: 0.8 }}/>
            </Link>
        );
        var disconnectButton = (
            <div>
                {/* Une icone ou qque chose autour ? */}
                <button onclick={this.DeleteSession}  sx={{ color: grey[900], fontSize: 60, padding: 0.8 }}>Log out</button>
            </div>
        );

        // if logged in (IE jwt_token exists, redirect to home)
        const jwt_token = localStorage.getItem('dashboard_jwt');

        if (jwt_token == null) {
            return (connectButton);
        }
        console.log("Jwt token = " + jwt_token);
        // check if you can authenticate with it

        var isValid = false;

        api.validateJWT(jwt_token)
        .then(res => {
            if (res.status === 200) {

                console.log("Token exists");
                // if you can, redirect to home
                isValid = res.data.validated;
            }
        })
        .catch(err => {
            console.log("Error " + err);
        })

        return (isValid ? disconnectButton : connectButton);
    }
}

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

    constructor({props}) {
        super(props);

        this.state = {
            loggedIn: false
        }
    }

    DeleteSession() {
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
                <LogoButton path={ '/' } icon={Widgets}/>
                {/* <ProfileButton loginPath={'/login'}/> */}

                {loggedIn ? <button onClick={this.DeleteSession} style={{ backgroundColor: "Transparent"}} >Log out</button> : <LogoButton path={ '/login' } icon={AccountCircle}/>}
                {/* <LogoButton path={ '/login' } icon={AccountCircle}/> */}
            </header>
        )
    }
}

export {HeaderHomePage, LogoButton}
