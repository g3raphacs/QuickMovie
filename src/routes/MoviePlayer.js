import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import { VideoPlayer, MvPlayerList, LoadButton } from '../components';
import { API_KEY , API_URL, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
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
            duration: "1h00",
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
                duration: "1h00m",
                imageUrl: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${oldMovie.backdrop_path}`,
                videoUrl: results[index]
            }
        })
        const id = this.props.match.params.id;
        
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
        const { movies, selectedMovie } = this.state;
        const movieIndex = movies.findIndex(movie => selectedMovie.id === movie.id)
        const nextMovieIndex = movieIndex === movies.length - 1 ? 0 : movieIndex +1;
        const newSelectedMovie = movies[nextMovieIndex];
        this.props.history.push({ pathname: `/player/${newSelectedMovie.id}`})
        this.setState({
            selectedMovie: newSelectedMovie
        })
    }


    getVideo = movieId =>{
        return new Promise((resolve) => {
            const url = `${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=fr`;
            axios.get(url)
                .then(data => {
                    if(data.data.results.length>0){
                        let trailerList = [];
                        let videoId = data.data.results[0].key;
                        for(let i =0 ; i<data.data.results.length ; i++){
                            console.log('loop')
                            console.log('type = ' , data.data.results[i])
                            if(data.data.results[i].type === "Trailer"){
                                trailerList.push(data.data.results[i])
                                console.log("video = ", trailerList)
                            }
                        }
                        if(trailerList.length>0){
                            videoId = trailerList[0].key;
                            for(let i =0 ; i<trailerList.length ; i++){
                                if(trailerList[i].name.search("[VF]")){
                                    videoId = trailerList[i].key;
                                }
                            }
                        }

                        const videoUrl = `https://www.youtube.com/watch?v=${videoId}&feature=youtu.be`
                        resolve(videoUrl)
                    }else{
                        const videoUrl = "https://www.youtube.com/watch?v=ruFQYsTFfUU"
                        resolve(videoUrl)
                    }
                })
                .catch(e => {
                    return null;
                })
        })
    }

    getNewMovies = async oldMovies => {
        let promises = [];
        for(let i =0 ; i<oldMovies.length; i++){
            const element = oldMovies[i];
            const id = element.id;
            const video = await this.getVideo(id);
            promises.push(video);
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