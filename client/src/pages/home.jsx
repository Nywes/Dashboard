import React, { Component } from 'react'
import { Wrapper, Container } from "../style";
import { Header, HeaderHomePage } from '../components/HomeHeader';

class Home extends Component {
    constructor({props}) {
        super(props)
        this.state = {
            name: ''
        }
    }

    // * basically an "init" function
    componentDidMount = async () => {
    }

    render() {
        return (
            <Wrapper>
                <HeaderHomePage/>
                <Container>

                </Container>
            </Wrapper>
        )
    }
}

export default Home