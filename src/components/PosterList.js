import React, { Component } from 'react';
import { Poster } from './Poster';

import { IMAGE_BASE_URL , POSTER_SIZE} from '../config'

import '../css/PosterList.css'

class PosterList extends Component{
    renderPoster = () => {
        return this.props.movies.map(movie =>{
            const imgSrc = `${IMAGE_BASE_URL}/${POSTER_SIZE}/${movie.poster_path}`;
            const whish = false;
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
        return(
            <div className="posterList">
                <h3 className="posterList--title">Nouveautés</h3>
                <div className="posterList--grid">
                    {this.renderPoster()}
                </div>
            </div>
        )
    }
}

export { PosterList };