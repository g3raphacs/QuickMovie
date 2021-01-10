import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import '../css/Header.css';

class Header extends Component {
    render(){
        return (
            <div className="header">
                <div className="logo"
                    style = {{backgroundImage: `url(${this.props.imgSrc})`, height: "55px", width: "400px", backgroundRepeat: 'no-repeat'}}
                ></div>
                <FontAwesome className="header--heart" name="heart" size="3x"/>
                <div className="header--badge">{this.props.badge}</div>
            </div>
        )
    }
}

export { Header };