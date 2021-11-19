import React, { Component } from 'react'
import { Wrapper, Container } from "../style/home-page-style";
import { Header } from '../components/HomeHeader';

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
                <Header/>
                <Container>

                </Container>
            </Wrapper>
        )
    }
}

export default Home