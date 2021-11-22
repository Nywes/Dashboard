import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api';
import {Wrapper, Title, InputText, Button, FormButtons, HorBar} from "../style/form-style";

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

        if (userName.length == 0 || password.length == 0) {
            alert("Please fill out all the fields");
            return;
        }

        await api.authenticateUser(payload)
        .then(res => {
            // * depending on res, redirect
            if (res.status == 200) {

                var jwt = res.data.token;
                // * store the JWT in localstorage
                document.cookie = "dashboard_jwt=" + jwt;

                //window.location.href = "/";

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
    }

    render() {
        const { userName, password } = this.state
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
            </Wrapper>
        )
    }
}

export default Login
