import React, { Component } from 'react'

import styled from 'styled-components';

const Title = styled.h1`
    margin: 0;
`

const Wrapper = styled.div`
    margin: 0 30px;
    text-align: center
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input`
    margin: 5px;
`

const Button = styled.button`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a`
    margin: 15px 15px 15px 5px;
`

const LoginButtons = styled.div`
    margin-top: 5%;
    color: blue;
`

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
        // window.location.href = "/movies/list";
    }

    // * basically an "init" function
    componentDidMount = async () => {
    }

    render() {
        const { name } = this.state
        return (
            <Wrapper>
                <Title>Log In</Title>


                <LoginButtons>
                    <Label>Name: </Label>
                    <InputText
                        type="text"
                        value={name}
                        onChange={this.handleChangeInputName}
                    />
                    <Label>Password: </Label>
                    <InputText
                        type="password"
                        // value={rating}
                        // onChange={this.handleChangeInputRating}
                    />
                    <Button onClick={this.handleLogin}>Login</Button>
                    {/* <CancelButton href={'/movies/list'}>Cancel</CancelButton> */}
                    {/* <Button href={'/signup'}>Sign Up</Button> */}
                </LoginButtons>
            </Wrapper>
        )
    }
}

export default Login