import React, { Component } from 'react'
import { Wrapper, Container, Item, WidgetManager } from "../style";
import { HeaderHomePage } from '../components/HomeHeader';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from "../style/HomePage.module.css"; 

class NBAWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className={this.props.widgetStyle}>
                <input type="text" placeholder="Search..." className={styles.SearchBar}/>
            </div>
        )
    }
}

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
        let seekWidget = this.props.item;

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
                    <WidgetInterface item={<NBAWidget widgetStyle={styles.WidgetItem}/>} isManager={divcont}/>
                    <WidgetInterface item={<Item/>} isManager={divcont}/>
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