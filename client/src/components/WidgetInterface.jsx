import React, { Component } from 'react'
import { WidgetManager } from "../style";
import { Visibility, VisibilityOff } from '@mui/icons-material';
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

export {WidgetInterface}
