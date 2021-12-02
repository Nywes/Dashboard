import React, { Component } from 'react'
import image from "../img/desert.jpg";
import {background, SetCallback} from "../globals/globalsVariables.js";

class Background extends Component {
    constructor(props) {
        super(props);

        // * if in local storage
        var storedBackground = localStorage.getItem("dashboard_background");
        if (storedBackground === null || storedBackground.length === 0) {
            storedBackground = this.props.background;
        }

        SetCallback(newBG => {
            this.setState({
                backgroundImage: newBG
            })
        })

        this.state = {
            backgroundImage: storedBackground
        };
    }

    render() {
        return (
            <div style={{ backgroundImage: `url(${this.state.backgroundImage})`, width:"100wh", height: "100vh", backgroundSize: "100%"}}>
                {this.props.children}
            </div>
            );
    }
  }

export { Background };