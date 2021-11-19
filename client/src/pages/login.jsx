import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {Wrapper, Title, InputText, Button, FormButtons, HorBar} from "../style/form-style";

class Login extends Component {
    constructor({props}) {
        super(props)
        this.state = {
            name: ''
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }


    handleLogin = async () => {

        // const { id, name, rating, time } = this.state
        // const arrayTime = time.split('/')
        // const payload = { name, rating, time: arrayTime }

        // await api.updateMovieById(id, payload).then(res => {
        //     window.alert(`Movie updated successfully`)
        //     this.setState({
        //         name: '',
        //         rating: '',
        //         time: '',
        //     })
        // })
        window.location.href = "/";
    }

    // * basically an "init" function
    componentDidMount = async () => {
    }

    render() {
        const { name } = this.state
        return (
            <Wrapper>
                <Title>Log In</Title>


                <FormButtons>
                    <InputText
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={this.handleChangeInputName}
                    />
                    <InputText
                        type="password"
                        placeholder="Password"
                        // value={rating}
                        // onChange={this.handleChangeInputRating}
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
