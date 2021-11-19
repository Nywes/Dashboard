import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import api from '../api'
import {Wrapper, Title, InputText, HorBar, Button, FormButtons} from "../style/form-style";

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

        if (confirmPass != this.state.password) {
            // todo mettre le champ en rouge et dire que les mdp sont pas les memes
        }
        this.setState({ confirmPass })
    }

    handleSignUp = async () => {

        const { userName, displayName, password, confirmPass } = this.state

        const payload = { userName, displayName, password };

        if (password != confirmPass) {
            alert("Passwords do not match");
            return;
        }

        // TODO check for non-empty username!!!

        // * find one by the userName:
        // * if exists: -> denied
        var userExists = false;

        await api.findUserByUserName(userName)
        .then(res => {
            console.log("Res status = ");

            if (res.status == 200 && res.data.data.length > 0) { // * found user, deny signup
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
            if (res.status == 200) {
                window.alert(`User created successfully`)
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
    }

    render() {
        const { userName, displayName, password, confirmPass } = this.state
        return (
            <Wrapper>
                <Title>Sign In</Title>
                <FormButtons>
                    <InputText
                        type="text"
                        placeholder="UserName"
                        value={userName}
                        onChange={this.handleChangeInputUserName}
                    />
                    <InputText
                        type="text"
                        placeholder="DisplayName"
                        value={displayName}
                        onChange={this.handleChangeInputDisplayName}
                    />
                    <InputText
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={this.handleChangePassword}
                    />
                    <InputText
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPass}
                        onChange={this.handleChangeConfirmPassword}
                    />
                    <Button onClick={this.handleSignUp}>Sign Up</Button>
                    <Link to="/login">
                        <Button>Log in</Button>
                    </Link>

                </FormButtons>
                <HorBar/>
            </Wrapper>
        )
    }
}

export default SignUp