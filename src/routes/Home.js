import React, { Component } from 'react';
import { HeaderImg, SearchBar, PosterList, LoadButton } from '../components';


class Home extends Component{
    render(){
        const { mTitle, mDesc, image, movies, loading, searching } = this.props;
        return(
            <div>
                <HeaderImg
                    title={mTitle}
                    overview={mDesc}
                    imgSrc={image}
                />
                <PosterList movies={movies}/>
                <LoadButton loading={loading}/>
                <SearchBar searching={searching} onSearchClick={this.props.onSearchClick}/>
            </div>
        )
    }
}

export { Home };