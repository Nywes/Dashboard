import React, { Component } from 'react'
import image from "../img/desert.jpg";
import {background} from "../globals/globalsVariables.js";

class Background extends Component {
    constructor(props) {
        super(props);

        this.state = {
            backgroundImage: this.props.background
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