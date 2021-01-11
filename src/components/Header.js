import React, { Component } from 'react';


import '../css/Header.css';
import { SearchButton } from './SearchButton';

class Header extends Component {
    render(){
        const { searching } = this.props;
        return (
            <div className="header">
                <div className="header--left">
                    <a href="#" className="header--logo"
                        style = {{backgroundImage: `url(${this.props.imgSrc})`}}
                    ></a>
                    <nav className="header--menu">
                        <ul>
                            <li>Series</li>
                            <li>Films</li>
                            <li>Nouveautés</li>
                            <li>Ma liste</li>
                        </ul>
                    </nav>
                </div>
                
                <div className="header--right">
                    <SearchButton onSearchButton={this.props.onSearchButton} searching={searching}/>
                </div>
                
            </div>
        )
    }
}

export { Header };