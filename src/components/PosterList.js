import React, { Component } from 'react';
import { Poster } from './Poster';

import { IMAGE_BASE_URL , POSTER_SIZE} from '../config'

import '../css/PosterList.css'


let whish;

class PosterList extends Component{
    renderPoster = () => {
        return this.props.movies.map(movie =>{
            const imgSrc = `${IMAGE_BASE_URL}/${POSTER_SIZE}/${movie.poster_path}`;
            whish = false;
            if(this.props.localMovies){
                this.props.localMovies.forEach(localMovie => {
                    if(movie.id === localMovie.id){
                        whish = true
                    }
                })
            }
            return (
                <Poster 
                    key={movie.id}
                    imgSrc={imgSrc}
                    whished={whish}
                    movie={movie}
                    mTitle={movie.title}
                    mDesc={movie.overview}
                    id={movie.id}
                />
            )
        })
    }

    render(){
        console.log(this.props.title)
        return(
            <div className="posterList">
                <h3 className="posterList--title">{this.props.title}</h3>
                <div className="posterList--grid">
                    {this.renderPoster()}
                </div>
            </div>
        )
    }
}

export { PosterList };