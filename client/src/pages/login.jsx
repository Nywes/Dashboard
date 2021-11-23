import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import api from '../api';
import {Wrapper, Title, InputText, Button, FormButtons, HorBar} from "../style/form-style";
import { GoogleLogin } from 'react-google-login';

class Login extends Component {
    constructor({props}) {
        super(props)
        this.state = {
            userName: '',
            password: ''
        }
    }

    handleChangeInputName = async event => {
        const userName = event.target.value
        this.setState({ userName })
    }

    handleChangePassword = async event => {
        const password = event.target.value
        this.setState({ password })
    }

    handleLogin = async () => {

        const { userName, password } = this.state;
        const payload = { userName, password }

        if (userName.length === 0 || password.length === 0) {
            alert("Please fill out all the fields");
            return;
        }

        await api.authenticateUser(payload)
        .then(res => {
            // * depending on res, redirect
            if (res.status === 200) {

                var jwt = res.data.token;
                // * store the JWT in localstorage
                //document.cookie = "dashboard_jwt=" + jwt;
                localStorage.setItem('dashboard_jwt', jwt);


                window.location.href = "/";

            } else {
                alert("Invalid credentials");

                this.setState({
                    userName: '',
                    password: ''
                })
            }
        })
        .catch(err => {
            console.log("Error " + err);
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

    googleSuccessLogin = async (response) => {
        console.log("Google log in success", response.profileObj);

        await api.findUserByUserName(response.profileObj.givenName)
        .then(async (res) => {
            if (res.status === 200) {
                console.log("User found ", res);

                await api.connectGoogleUser(response.email)
                .then(res => {
                    var jwt = res.data.token;

                    localStorage.setItem('dashboard_jwt', jwt);
                    window.location.href = "/";
                })
            }
        })
        .catch(async (err) => {
            console.log("Caught error while finding user ", err.response.status);
            if (err.response.status == 404) {
                console.log("User not found, creating google user");
                var payload = {"displayName": response.profileObj.givenName, "userName": response.profileObj.email}
                await api.createGoogleUser(payload)
                .then(res => {
                    var jwt = res.data.token;
                    localStorage.setItem('dashboard_jwt', jwt);
                    window.location.href = "/";
                })
                .catch(err => {
                    console.log("Error creating user " + err);
                })
            }
        })

        // * api.searchUser
            // * if found
                // * connectGoogle(response.email)
            // * else
                // * createGoogle(customPayload)
    }

    googleFailLogin = (response) => {

        console.log("Google login failed ", response);
    }


    render() {
        const { userName, password } = this.state;

        const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        console.log("Got client id = ", googleClientID);

        return (
            <Wrapper>
                <Title>Log In</Title>


                <FormButtons>
                    <InputText
                        type="text"
                        placeholder="userName"
                        value={userName}
                        onChange={this.handleChangeInputName}
                    />
                    <InputText
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={this.handleChangePassword}
                    />
                    <Button onClick={this.handleLogin}>Log In</Button>
                    {/* <CancelButton href={'/movies/list'}>Cancel</CancelButton> */}
                    <Link to={'/signup'}>
                        <Button >Sign Up</Button>
                    </Link>
                </FormButtons>
                <HorBar/>
                {/* {googleClientID !== undefined ?
                    <GoogleLogin
                        clientId={googleClientID}
                        buttonText="Login"
                        onSuccess={this.googleSuccessLogin}
                        onFailure={this.googleFailLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                : <div/>} */}
                <GoogleLogin
                    clientId={googleClientID}
                    buttonText="Login with google"
                    onSuccess={this.googleSuccessLogin}
                    onFailure={this.googleFailLogin}
                    // cookiePolicy={'single_host_origin'}
                />

            </Wrapper>
        )
    }
}

export default Login
