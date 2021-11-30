import React, { Component } from 'react'
import image from "../img/desert.jpg";
import background from "../globals/globalsVariables.js";

class Background extends Component {
    render() {
        console.log(background.background)
        return (
            <div style={{ backgroundImage: `url(${background.background})`, width:"100wh", height: "100vh", backgroundSize: "100%"}}>
                {this.props.children}
            </div>
            );
    }
  }

export { Background };