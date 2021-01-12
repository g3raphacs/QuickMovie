import React, { Component } from 'react';
import '../css/Actor.css';

class Actor extends Component{
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

    render(){
        const lastFour = this.props.imgSrc.substr(this.props.imgSrc.length - 4)
        if(lastFour === "null"){
                return null;
        }
        const name = this.props.name.split(" ");
        return(
            <div
                className="actor"
                onMouseEnter={this.showOverlay}
                onMouseLeave={this.hideOverlay}
            >
                <img className="actor--img" alt="actor" src={this.props.imgSrc}/>
                {this.state.hover ? (
                    <div className="actor--overlay">
                        <h3 className="actor--name">{name[0]}</h3>
                        <h3 className="actor--name">{name[1]}</h3>
                    </div>
                ) : (null)}
            </div>
        )
    }
}

export { Actor }