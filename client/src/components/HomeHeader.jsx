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
                {widgetManager?<p className= { styles.widgetText }> Click on a Logo to add a Widget </p>:null}
                {widgetManager?<img
                    src='https://assets.materialup.com/uploads/347c48be-3ed3-4e80-87a0-3353405f0239/0x0ss-85.jpg'
                    className={ styles.widgetManager }
                    onClick={() => this.props.toggleWidgetsButton(0)}
                />:null}
                {widgetManager?<p className= { styles.widgetText }>NBA Team</p>:null}

                {widgetManager?<img
                    src='https://assets.materialup.com/uploads/347c48be-3ed3-4e80-87a0-3353405f0239/0x0ss-85.jpg'
                    className={ styles.widgetManager }
                    onClick={() => this.props.toggleWidgetsButton(1)}
                ></img>:null}
                {widgetManager?<p className= { styles.widgetText }>NBA Player</p>:null}

                {widgetManager?<img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png'
                    className={ styles.widgetManager }
                    onClick={() => this.props.toggleWidgetsButton(2)}
                />:null}
                {widgetManager?<p className= { styles.widgetText }>Cryptocurrencies</p>:null}

                {widgetManager?<img
                    src='https://icon-library.com/images/ios-gallery-icon/ios-gallery-icon-29.jpg'
                    className={ styles.widgetManager }
                    onClick={() => this.props.toggleWidgetsButton(3)}
                />:null}
                {widgetManager?<p className= { styles.widgetText }>Background</p>:null}

                {widgetManager?<img
                    src='https://objectifsmartphone.fr/wp-content/uploads/2020/06/hearthstonelogo-bb3x.png'
                    className={ styles.widgetManager }
                    onClick={() => this.props.toggleWidgetsButton(4)}
                />:null}
                {widgetManager?<p className= { styles.widgetText }>Hearthstone</p>:null}

                {widgetManager?<img
                    src='https://image.flaticon.com/icons/png/512/61/61961.png'
                    className={ styles.widgetManager }
                    onClick={() => this.props.toggleWidgetsButton(5)}
                />:null}
                {widgetManager?<p className= { styles.widgetText }>Quote</p>:null}


                <Widgets onClick={() => this.changeWidgetManagerState()} className={styles.HeaderIcon}/>
                {/* <ProfileButton loginPath={'/login'}/> */}
                <Delete onClick={() => this.props.DeleteSelectedWidgets()} className={styles.HeaderIcon}/>

                {loggedIn ? <Logout onClick={this.DeleteSession} className={styles.HeaderIcon} /> : <LogoButton path={ '/login' } icon={AccountCircle}/>}
                {/* <LogoButton path={ '/login' } icon={AccountCircle}/> */}
            </header>
        )
    }
}

export {HeaderHomePage, LogoButton}
