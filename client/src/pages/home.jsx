import React, { Component } from 'react'
import { Wrapper, Container, Item, WidgetManager } from "../style";
import { LogoButton } from '../components/HomeHeader';
import { AccountCircle, Widgets, Visibility, VisibilityOff } from '@mui/icons-material';
import styles from "../style/HomePage.module.css";

class WidgetInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isManager: this.props.isManager,
            display: true,
        }
    }
    handlechange = () =>
    {
        this.setState({display:!this.state.display})
    }

    render() {
        let seekManager = <WidgetManager onClick={this.handlechange}><Visibility className={styles.VisibilityIcon}/></WidgetManager>;
        let hiddenManager = <WidgetManager onClick={this.handlechange}><VisibilityOff className={styles.VisibilityIcon}/></WidgetManager>;
        let seekWidget = <Item/>;

        let temp = this.props.isManager;
        let tempDisplay = this.state.display;

        console.log(this.state.display);
        if (temp) {
            if (tempDisplay) {
                return (seekWidget);
            } else {
                return (null);
            }
        } else {
            if (tempDisplay) {
                return (seekManager);
            } else {
                return (hiddenManager);
            }
        }
    }
}

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

    render() {
        var handlechange = () =>
        {
            this.setState({divcont:!this.state.divcont})
        }
        return (
            <Wrapper className="App">
                <header className={styles.HeaderHomePage}>
                    <Widgets onClick={handlechange} className={styles.HeaderIcon}/>
                    <LogoButton path={ '/login' } icon={AccountCircle}/>
                </header>
                <Container>
                    <WidgetInterface isManager={this.state.divcont}/>
                    <WidgetInterface isManager={this.state.divcont}/>
                    <WidgetInterface isManager={this.state.divcont}/>
                    <WidgetInterface isManager={this.state.divcont}/>
                    <WidgetInterface isManager={this.state.divcont}/>
                    <WidgetInterface isManager={this.state.divcont}/>
                    <WidgetInterface isManager={this.state.divcont}/>
                    <WidgetInterface isManager={this.state.divcont}/>
                    <WidgetInterface isManager={this.state.divcont}/>
                </Container>
            </Wrapper>
        )
    }
}

export default Home