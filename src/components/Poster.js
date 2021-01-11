import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import '../css/Poster.css'

class Poster extends Component {
    state = {
        hover: false
    }

    showOverlay = () => {
        if(!this.state.hover){
            this.setState({ hover: true})
        }
    }
    hideOverlay = () => {
        if(this.state.hover){
            this.setState({ hover: false})
        }
    }
    add = () => {
        //implementer avec Redux
        console.log('add to wishlist')
    }
    remove = () => {
        //implementer avec Redux
        console.log('remove from wishlist')
    }

    render(){
        return(
            <div
                onMouseEnter={this.showOverlay}
                onMouseLeave={this.hideOverlay}
                className="poster"
            >
                <img className="poster--img hovered" src={this.props.imgSrc} alt="poster"/>
                {this.state.hover ? (
                    <div className="poster--overlay">
                        {this.props.whished ? (
                            <FontAwesome onClick={this.remove} className="poster--icon" name="heart" size="2x"/>
                            ) : (
                            <FontAwesome onClick={this.add} className="poster--icon-no" name="heart-o" size="2x"/>
                            )}
                    </div>
                ): null}
            </div>
        )
    }

}

export { Poster }