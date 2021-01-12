import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Spinner } from './Spinner';


import '../css/LoadButton.css';



class LoadButton extends Component{

    render(){
        return(
            <>
            {this.props.loading ? (
                    <Spinner/>
            ) : (
                <div className="loadButton"></div>
            )}
            </>
        )
    }
}

export { LoadButton }