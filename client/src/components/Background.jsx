import React, { Component } from 'react'
import image from "../img/desert.jpg";

class Background extends Component {
    render() {

        return (
            <div style={{ backgroundImage:`url(${image})`, width:"100wh", height: "100vh", backgroundSize: "100%"}}>
                {this.props.children}
            </div>
            );
    }
  }

export { Background };