import React, { Component } from 'react'

import styled from 'styled-components';

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
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

            </Wrapper>
        )
    }
}

export default Login