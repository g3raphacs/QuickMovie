import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Spinner } from './Spinner';


import '../css/LoadButton.css';



class LoadButton extends Component{
    render(){
        return(
            <>
            {this.props.loading ? (
                <div className="spinnerBox">
                    <Spinner/>
                </div>
            ) : (
                <div onClick={this.props.onButtonClick} className="loadButton">
                    <FontAwesome className="header--search" name="angle-down" size="2x"/>
                </div>
            )}
            </>
        )
    }
}

export { LoadButton }