import React, { Component } from 'react'
import { Wrapper, Container, Item, ItemW } from "../style";
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
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                    <Item/>
                </Container>
            </Wrapper>
        )
    }
}

export default Home