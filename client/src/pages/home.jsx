import React, { Component, useState } from 'react'
import { Wrapper, Container, Item, WidgetManager } from "../style";
import { HeaderHomePage } from '../components/HomeHeader';
import { WidgetInterface } from '../components/WidgetInterface';
import { NBATeamWidget } from '../components/NBATeamWidget';
import { NBAPlayerWidget } from '../components/NBAPlayerWidget';
import { BackgroundWidget } from '../components/BackgroundWidget';
import { CryptoConverterWidget } from '../components/CryptoConverterWidget';
import styles from "../style/HomePage.module.css";

class Home extends Component {
    constructor({props}) {
        super(props);
        this.state = {
            name: '',
            divcont: true,
        }
    }
    // * basically an "init" function
    componentDidMount = async () => {
    }

    handlechange()
    {
        this.setState({divcont:!this.state.divcont})
    }

    render() {
        const { divcont } = this.state;
        return (
            <Wrapper className="App">
                {/* <header className={styles.HeaderHomePage}>
                    <Widgets onClick={handlechange} className={styles.HeaderIcon}/>
                    <LogoButton path={ '/login' } icon={AccountCircle}/>
                </header> */}
                <HeaderHomePage toggleWidgetsButton={() => this.handlechange()} />
                <Container>
                    <WidgetInterface item={<NBATeamWidget widgetStyle={styles.NBAWidgetItem}/>} isManager={divcont}/>
                    <WidgetInterface item={<NBAPlayerWidget widgetStyle={styles.NBAWidgetItem}/>} isManager={divcont}/>
                    <WidgetInterface item={<Item/>} isManager={divcont}/>
                    <WidgetInterface item={<CryptoConverterWidget widgetStyle={styles.CryptoWidgetItem}/>} isManager={divcont}/>
                    <WidgetInterface item={<BackgroundWidget widgetStyle={styles.BackgroundWidgetItem}/>} isManager={divcont}/>
                    <WidgetInterface item={<Item/>} isManager={divcont}/>
                    <WidgetInterface item={<Item/>} isManager={divcont}/>
                    <WidgetInterface item={<Item/>} isManager={divcont}/>
                    <WidgetInterface item={<Item/>} isManager={divcont}/>
                </Container>
            </Wrapper>
        )
    }
}

export default Home