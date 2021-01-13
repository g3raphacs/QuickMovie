import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import { VideoPlayer, MvPlayerList, LoadButton } from '../components';
import { API_KEY , API_URL, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
import { calcTime } from '../utils/helpers'
import '../css/MoviePlayer.css';

let newMovies=[];
let renderKey=0;

class MoviePlayer extends Component{
    state= {
        movies: [
            {
                duration: "2h 9m",
                id: 429614,
                imageUrl: "http://image.tmbd.org/t/p/w1280//5myQbDzw318K9yofUXRJ4UTVgam.jpg",
                position: 1,
                title: "Spider-Man : Far from home",
                videoUrl: "https://www.youtube.com/watch?v=ruFQYsTFfUU"
            },
            {
                duration: "2h 9m",
                id: 429615,
                imageUrl: "http://image.tmbd.org/t/p/w1280//5myQbDzw318K9yofUXRJ4UTVgam.jpg",
                position: 1,
                title: "Spider-Man : Far from home",
                videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            },
            {
                duration: "2h 9m",
                id: 429616,
                imageUrl: "http://image.tmbd.org/t/p/w1280//5myQbDzw318K9yofUXRJ4UTVgam.jpg",
                position: 1,
                title: "Spider-Man : Far from home",
                videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            },
            {
                duration: "2h 9m",
                id: 429617,
                imageUrl: "http://image.tmbd.org/t/p/w1280//5myQbDzw318K9yofUXRJ4UTVgam.jpg",
                position: 1,
                title: "Spider-Man : Far from home",
                videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            },
            {
                duration: "2h 9m",
                id: 429618,
                imageUrl: "http://image.tmbd.org/t/p/w1280//5myQbDzw318K9yofUXRJ4UTVgam.jpg",
                position: 1,
                title: "Spider-Man : Far from home",
                videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            }
        ],
        selectedMovie: {
            duration: "2h 9m",
            id: 429617,
            imageUrl: "http://image.tmbd.org/t/p/w1280//5myQbDzw318K9yofUXRJ4UTVgam.jpg",
            position: 1,
            title: "Spider-Man : Far from home",
            videoUrl: "https://www.youtube.com/watch?v=ruFQYsTFfUU"
        },
        loading: true
    }

    async componentDidMount(){
        const oldMovies = JSON.parse(localStorage.getItem('movies'));
        const results = await this.getNewMovies(oldMovies);
        newMovies = oldMovies.map((oldMovie, index) => {
            return {
                id: oldMovie.id,
                position: index + 1,
                title: oldMovie.title,
                duration: results[index],
                imageUrl: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${oldMovie.backdrop_path}`,
                videoUrl: "https://www.youtube.com/watch?v=ruFQYsTFfUU"
            }
        })
        const id = this.props.match.params.id;
        console.log(this.props.match.params);
        console.log(window.location.href);
        
        if (id) {
            const selectedMovie = this.getSelectedMovie(newMovies, id);
            this.setState({
                loading:false,
                movies: [...newMovies],
                selectedMovie: selectedMovie
            })
        }else{
            const selectedMovie = newMovies[0];
            this.setState({
                loading:false,
                movies: [...newMovies],
                selectedMovie: selectedMovie
            })
            this.props.history.push({
                pathname: `/player/${selectedMovie.id}`
            })
        }
    }

    componentDidUpdate(prevProps){
        console.log('component did update');
        if(prevProps.match.params.id !== this.props.match.params.id){
            const id = this.props.match.params.id;
            const selectedMovie = this.getSelectedMovie(newMovies, id);
            this.setState({
                selectedMovie: selectedMovie,
            })
        }
    }

    getSelectedMovie = (movies, movieId) =>{
        const selectedMovie = _.find(movies, { id: parseInt(movieId, 10) });
        return selectedMovie;
    }

    handleEnded = () =>{
        console.log("video ended");
        const { movies, selectedMovie } = this.state;
        const movieIndex = movies.findIndex(movie => selectedMovie.id === movie.id)
        const nextMovieIndex = movieIndex === movies.length - 1 ? 0 : movieIndex +1;
        const newSelectedMovie = movies[nextMovieIndex];
        this.props.history.push({ pathname: `/player/${newSelectedMovie.id}`})
        this.setState({
            selectedMovie: newSelectedMovie
        })
    }

    getTime = movieId =>{
        return new Promise((resolve , reject) => {
            const url = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr`;
            axios.get(url)
                .then(data => {
                    const duration = data.data.runtime;
                    resolve(duration)
                })
                .catch(e => {
                    console.log('e' , e);
                    reject('error' , e);
                })
        })
    }

    getNewMovies = async oldMovies => {
        let promises = [];
        for(let i =0 ; i<oldMovies.length; i++){
            const element = oldMovies[i];
            const id = element.id;
            const time = await this.getTime(id);
            promises.push(calcTime(time));
        }
        return Promise.all(promises);
    }

    render(){
        const { movies, selectedMovie, loading} = this.state;
        renderKey++;
        return(
            <div className="moviePlayer">
                {this.state.loading ? (
                    <LoadButton loading={loading}/>
                ) : (
                <>
                    <VideoPlayer
                        key={renderKey}
                        videoUrl={selectedMovie.videoUrl}
                        imageUrl={selectedMovie.imageUrl}
                        handleEnded={this.handleEnded}
                        />
                    <MvPlayerList
                        movies={movies}
                        selectedMovie={selectedMovie}
                        />
                </>
                )}
            </div>
        )
    }
}

export { MoviePlayer }