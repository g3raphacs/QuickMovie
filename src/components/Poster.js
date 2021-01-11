import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import '../css/Poster.css'

class Poster extends Component {
    state = {
        hover: false
    }

    render(){
        return(
            <div className="poster">
                <img className="poster--img" src={this.props.imgSrc} alt="poster"/>
                {this.state.hover ? (
                    <div className="poster--overlay">
                        {this.props.whished ? (
                            <FontAwesome className="poster--icon" name="heart" size="2x"/>
                        ) : (
                            <FontAwesome className="poster--icon" name="heart-o" size="2x"/>
                        )}
                    </div>
                ): null}
            </div>
        )
    }

}

export { Poster }