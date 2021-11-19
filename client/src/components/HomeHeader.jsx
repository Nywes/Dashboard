import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { AccountCircle, ThirtyFpsSelect } from '@mui/icons-material';

class LogoButton extends Component {
    render() {
        return (
            <Link to={this.props.path}>
                <this.props.icon/>
            </Link>
        )
    }
}

class Header extends Component {
    render() {
        return (
            <header>
                <LogoButton path={ '/login' } icon={AccountCircle}/>
            </header>
        )
    }
}

export {Header}