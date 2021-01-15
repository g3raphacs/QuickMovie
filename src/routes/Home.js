import React, { Component } from 'react';
import { connect } from 'react-redux';

import { HeaderImg, SearchBar, PosterList, LoadButton } from '../components';
import { getMovies } from '../actions/movie';


class HomeComponent extends Component{
    componentDidMount(){
        this.props.getMovies();
    }
    render(){
        const { mTitle, mDesc, image, movies, loading, searching, title} = this.props;
        return(
            <div>
                <HeaderImg
                    title={mTitle}
                    overview={mDesc}
                    imgSrc={image}
                />
                <PosterList title={title} movies={movies} localMovies={this.props.localMovies}/>
                <LoadButton loading={loading}/>
                <SearchBar searching={searching} onSearchClick={this.props.onSearchClick}/>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        localMovies: state.movies.movies
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getMovies: ()=> dispatch(getMovies())
    }
}
const Home = connect(mapStateToProps,mapDispatchToProps)(HomeComponent);

export { Home };