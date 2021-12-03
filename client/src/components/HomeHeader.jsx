import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { AccountCircle, Widgets, Logout, Delete } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import styles from "../style/HomePage.module.css"
import neon from "../style/NeonEffect.module.css"
import api from '../api'
import NBALogo from '../img/nbaLogo.png'
import CryptoLogo from '../img/bitcoinLogo.png'
import BackgroundLogo from '../img/bgLogo.png'
import HSLogo from '../img/hearthstoneLogo.png'
import QuoteLogo from '../img/quoteLogo.png'

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
            loggedIn: false,
            widgetManager: false,
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
                localStorage.removeItem("dashboard_jwt");
            }
        })
        .catch(err => {
            console.log("Error " + err);
            localStorage.removeItem("dashboard_jwt");
        })
    }

    changeWidgetManagerState = async () => {
        this.setState({
            widgetManager: !this.state.widgetManager
          });
    }

    render() {

        const { loggedIn, widgetManager } = this.state;

        return (
            <header className={styles.HeaderHomePage}>
                {widgetManager?<p className={neon.text}> Click on a neon to add a Widget </p>:null}
                {widgetManager?<img
                    src={NBALogo}
                    className={ styles.NBAWidgetManager }
                />:null}

                {widgetManager?<p className={neon.text} onClick={() => this.props.toggleWidgetsButton(0)}><span className={ neon.letter2 }>N</span>BA T<span className={ neon.letter2 }>e</span>am</p>:null}

                {widgetManager?<img
                    src={NBALogo}
                    className={ styles.NBAWidgetManager }
                ></img>:null}
                {widgetManager?<p className={neon.text} onClick={() => this.props.toggleWidgetsButton(1)}>NBA Player</p>:null}

                {widgetManager?<img
                    src={CryptoLogo}
                    className={ styles.widgetManager }
                />:null}
                {widgetManager?<p className={neon.text} onClick={() => this.props.toggleWidgetsButton(2)}>Cryptocur<span className={ neon.letter4 }>r</span>encies</p>:null}

                {widgetManager?<img
                    src={BackgroundLogo}
                    className={ styles.widgetManager }
                />:null}
                {widgetManager?<p className={neon.text} onClick={() => this.props.toggleWidgetsButton(3)}>Background</p>:null}

                {widgetManager?<img
                    src={HSLogo}
                    className={ styles.widgetManager }
                />:null}
                {widgetManager?<p className={neon.text} onClick={() => this.props.toggleWidgetsButton(4)}>Hearthstone</p>:null}

                {widgetManager?<img
                    src={QuoteLogo}
                    className={ styles.widgetManager }
                />:null}
                {widgetManager?<p className={neon.text} onClick={() => this.props.toggleWidgetsButton(5)}>Q<span className={ neon.letter3 }>u</span>ot<span className={ neon.letter5 }>e</span></p>:null}


                <Widgets onClick={() => this.changeWidgetManagerState()} className={styles.HeaderIcon}/>
                {/* <ProfileButton loginPath={'/login'}/> */}
                <Delete onClick={() => this.props.DeleteSelectedWidgets()} className={styles.HeaderIcon}/>

                {loggedIn ? <Logout onClick={this.DeleteSession} className={styles.HeaderIcon} /> : <LogoButton className={styles.HeaderIcon} path={ '/login' } icon={AccountCircle}/>}
                {/* <LogoButton path={ '/login' } icon={AccountCircle}/> */}
            </header>
        )
    }
}

export {HeaderHomePage, LogoButton}
