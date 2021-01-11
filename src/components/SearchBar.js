import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import '../css/SearchBar.css';

class SearchBar extends Component{
    state = {
        value: "",
    }

    componentDidUpdate(){
        const searchBar = document.querySelector('.searchBar--container')
        if(this.props.searching){
            searchBar.classList.add('deployed');
        }else{
            searchBar.classList.remove('deployed');
        }
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }
    handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            console.log('yes')
            this.props.onSearchClick(e.target.value);
        }
    }

    render(){
        const { value } = this.state;
        return(
            <div className="searchBar--container">
                <div className="searchBar">
                    <input
                        className="searchBar--input"
                        type="text"
                        placeholder="Rechercher"
                        value={this.state.value}
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyPress}
                    />
                    <div
                        onClick={() => this.props.onSearchClick(value)}
                        className="searchBar--submit"
                    >
                        <FontAwesome className="header--search" name="search" size="2x"/>
                    </div>
                </div>
            </div>
        )
    }
}

export { SearchBar };