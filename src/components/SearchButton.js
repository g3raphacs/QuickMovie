import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import '../css/SearchButton.css'

class SearchButton extends Component {
    buttonClick = () => {
        this.searchClick();
        this.props.onSearchButton();
    }
    searchClick = () => {
        
    }
    render(){
        return(
            <div className="search-button">       
                {this.props.searching ? (
                    <FontAwesome onClick={this.buttonClick} className="search-button--search" name="times" size="3x"/>
                )
                :
                (
                    <FontAwesome onClick={this.buttonClick} className="search-button--search" name="search" size="2x"/>
                )
                }
            </div>
        )
    }
}

export { SearchButton };