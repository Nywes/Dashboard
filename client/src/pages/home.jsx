import React, { Component } from 'react'
import { Wrapper, Container, Item, WidgetManager } from "../style";
import { LogoButton } from '../components/HomeHeader';
import { AccountCircle, Widgets, Visibility } from '@mui/icons-material';
import styles from "../style/HomePage.module.css";

class Home extends Component {
    constructor({props}) {
        super(props)
        this.state = {
            display: true,
            name: ''
        }
    }

    state = {
        divcont: true,
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
                    <Widgets onClick={handlechange} className={styles.HeaderIcon}/>
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