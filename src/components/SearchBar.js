import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import '../css/SearchBar.css';

class SearchBar extends Component{
    state = {
        value: "",
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }

    render(){
        return(
            <div className="searchBar--container">
                <div className="searchBar">
                    <input
                        className="searchBar--input"
                        type="text"
                        placeholder="Rechercher"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <div className="searchBar--submit">
                    <FontAwesome className="header--search" name="search" size="2x"/>
                    </div>
                </div>
            </div>
        )
    }
}

export { SearchBar };