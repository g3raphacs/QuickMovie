import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNumber } from '../actions/movie';
import { MenuLink } from './index';


import '../css/Header.css';
import { SearchButton } from './SearchButton';

class HeaderComponent extends Component {
    componentDidMount(){
        this.props.getNumber();
    }
    render(){
        const { searching } = this.props;
        return (
            <div className="header">
                <div className="header--left">
                    <Link to={{ pathname: "/"}}>
                        <div className="header--logo"
                        style = {{backgroundImage: `url(${this.props.imgSrc})`}}
                        ></div>
                    </Link>
                    
                    <nav className="header--menu">
                        <ul>
                            <MenuLink path="/films" label="Films"/>
                            <MenuLink path="/series" label="Series"/>
                            <MenuLink path="/maliste" label="Ma liste"/>
                            <MenuLink path="/player" label="Regarder"/>
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

const mapStateToProps = state => {
    return {
        badge: state.movies.number
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getNumber: () => dispatch(getNumber())
    }
}
const Header = connect(mapStateToProps , mapDispatchToProps)(HeaderComponent);


export { Header };