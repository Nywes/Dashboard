import React, { Component } from 'react'
import { Wrapper, Container, Item, WidgetManager } from "../style";
import { LogoButton } from '../components/HomeHeader';
import { AccountCircle, Widgets, Visibility } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import styles from "../style/HomePage.module.css";

class Home extends Component {
    constructor({props}) {
        super(props)
        this.state = {
            display: false,
            name: ''
        }
    }

    state = {
        divcont: false,
    }
    // * basically an "init" function
    componentDidMount = async () => {
    }

    render() {
        var handlechange = e =>
        {
            this.setState({divcont:!this.state.divcont})
        }
        const x=this.state.divcont;
        return (
            <Wrapper className="App">
                <header className={styles.HeaderHomePage}>
                    <Widgets onClick={handlechange} sx={{ color: grey[900], fontSize: 60, padding: 0.8 }}/>
                    <LogoButton path={ '/login' } icon={AccountCircle}/>
                </header>
                <Container>
                    {x?<Item/>:<WidgetManager><Visibility className={styles.VisibilityIcon}/></WidgetManager>}
                    {x?<Item/>:<WidgetManager><Visibility className={styles.VisibilityIcon}/></WidgetManager>}
                    {x?<Item/>:<WidgetManager><Visibility className={styles.VisibilityIcon}/></WidgetManager>}
                    {x?<Item/>:<WidgetManager><Visibility className={styles.VisibilityIcon}/></WidgetManager>}
                    {x?<Item/>:<WidgetManager><Visibility className={styles.VisibilityIcon}/></WidgetManager>}
                    {x?<Item/>:<WidgetManager><Visibility className={styles.VisibilityIcon}/></WidgetManager>}
                    {x?<Item/>:<WidgetManager><Visibility className={styles.VisibilityIcon}/></WidgetManager>}
                    {x?<Item/>:<WidgetManager><Visibility className={styles.VisibilityIcon}/></WidgetManager>}
                    {x?<Item/>:<WidgetManager><Visibility className={styles.VisibilityIcon}/></WidgetManager>}
                </Container>
            </Wrapper>
        )
    }
}

export default Home