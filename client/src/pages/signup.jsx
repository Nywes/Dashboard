import React, { Component } from 'react'

import {Wrapper, Title, HorBar, Button, FormButtons} from "../style/form-style";

class SignUp extends Component {
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


    handleSignUp = async () => {

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
                <Title>Sign In</Title>
                <FormButtons>
                    <Button onClick={this.handleLogin}>Log In</Button>
                </FormButtons>
                <HorBar/>
            </Wrapper>
        )
    }
}

export default SignUp