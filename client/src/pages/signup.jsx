import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import api from '../api'
import {Wrapper, Title, InputText, HorBar, Button, FormButtons} from "../style/form-style";
import styles from "../style/LoginPage.module.css";
import neon from "../style/NeonEffect.module.css";

class SignUp extends Component {
    constructor({props}) {
        super(props)
        this.state = {
            displayName: '',
            userName: '',
            password: '',
            confirmPass: ''
        }
    }

    handleChangeInputDisplayName = async event => {
        const displayName = event.target.value;
        this.setState({ displayName })
    }

    handleChangeInputUserName = async event => {
        const userName = event.target.value;
        this.setState({ userName })
    }

    handleChangePassword = async event => {
        const password = event.target.value
        this.setState({ password })
    }

    handleChangeConfirmPassword = async event => {
        const confirmPass = event.target.value

        if (confirmPass !== this.state.password) {
            // todo mettre le champ en rouge et dire que les mdp sont pas les memes
        }
        this.setState({ confirmPass })
    }

    handleSignUp = async () => {

        const { userName, displayName, password, confirmPass } = this.state

        const payload = { userName, displayName, password };

        if (password !== confirmPass) {
            alert("Passwords do not match");
            return;
        }

        // TODO check for non-empty username!!!

        if (password.length === 0 || userName.length === 0 || displayName.length === 0 || confirmPass.length === 0) {
            alert("Please fill out all the fields");
            return;
        }

        // * find one by the userName:
        // * if exists: -> denied
        var userExists = false;

        await api.findUserByUserName(userName)
        .then(res => {
            console.log("Res status = ");

            if (res.status === 200 && res.data.data.length > 0) { // * found user, deny signup
                alert("This userName is already taken");
                console.log("Username is already taken");
                userExists = true;
            }
        })
        .catch(res => {
            console.log("No user found, or error, proceed");
        })

        if (userExists) {
            this.setState({
                userName: '',
                displayName: '',
                password: '',
                confirmPass: ''
            })
            return;
        }

        await api.createUser(payload)
        .then(res => {
            if (res.status === 200) {
                window.alert(`LoggedUser created successfully`)
                window.location.href = "/";
            } else {
                window.alert(`Failed to create user`)
            }
            this.setState({
                userName: '',
                displayName: '',
                password: '',
                confirmPass: ''
            })
        })
    }

    // * basically an "init" function
    componentDidMount = async () => {

        // if logged in (IE jwt_token exists, redirect to home)
        const jwt_token = localStorage.getItem('dashboard_jwt');

        if (jwt_token == null) {
            return;
        }
        console.log("Jwt token = " + jwt_token);
        // check if you can authenticate with it

        await api.validateJWT(jwt_token)
        .then(res => {
            if (res.status === 200) {

                // if you can, redirect to home
                var isValid = res.data.validated;
                if (isValid)
                    window.location.href = "/";
            }
        })
        .catch(err => {
            console.log("Error " + err);
        })
    }

    render() {
        const { userName, displayName, password, confirmPass } = this.state
        return (
            <Wrapper>
                <Title className={ neon.loginTitle }>Si<span className={ neon.letter1 }>g</span>n <span className={ neon.letter2 }>I</span>n</Title>
                <FormButtons>
                    <InputText
                        type="text"
                        placeholder="UserName"
                        value={userName}
                        onChange={this.handleChangeInputUserName}
                        className={ styles.inputtext }
                    />
                    <InputText
                        type="text"
                        placeholder="DisplayName"
                        value={displayName}
                        onChange={this.handleChangeInputDisplayName}
                        className={ styles.inputtext }
                    />
                    <InputText
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={this.handleChangePassword}
                        className={ styles.inputtext }
                    />
                    <InputText
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPass}
                        onChange={this.handleChangeConfirmPassword}
                        className={ styles.inputtext }
                    />
                    <Button onClick={this.handleSignUp} className={ styles.button }>Sign Up</Button>
                    <Link to="/login">
                        <Button className={ styles.button }>Log in</Button>
                    </Link>

                </FormButtons>
                <HorBar/>
            </Wrapper>
        )
    }
}

export default SignUp