import React, { Component, useState } from 'react'
import { Wrapper, Container, Item, WidgetManager } from "../style";
import { HeaderHomePage } from '../components/HomeHeader';
import { WidgetInterface } from '../components/WidgetInterface';
import { NBATeamWidget } from '../components/NBATeamWidget';
import { NBAPlayerWidget } from '../components/NBAPlayerWidget';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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
                    <WidgetInterface item={<NBATeamWidget widgetStyle={styles.WidgetItem}/>} isManager={divcont}/>
                    <WidgetInterface item={<NBAPlayerWidget widgetStyle={styles.WidgetItem}/>} isManager={divcont}/>
                    <WidgetInterface item={<Item/>} isManager={divcont}/>
                    <WidgetInterface item={<Item/>} isManager={divcont}/>
                    <WidgetInterface item={<Item/>} isManager={divcont}/>
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