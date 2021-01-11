import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import '../css/SearchButton.css'

class SearchButton extends Component {
    state = {
        searching: false
    }

    searchClick = ()=>{
        this.setState({searching: !this.state.searching});
        const searchBar = document.querySelector('.searchBar--container');
        searchBar.classList.toggle('deployed');
    }
    render(){
        return(
            <div className="search-button">       
                {this.state.searching ? (
                    <FontAwesome onClick={this.searchClick} className="search-button--search" name="times" size="3x"/>
                )
                :
                (
                    <FontAwesome onClick={this.searchClick} className="search-button--search" name="search" size="2x"/>
                )
                }
            </div>
        )
    }
}

export { SearchButton };