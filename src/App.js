import React, { Component } from 'react';
import axios from 'axios';

import { Header } from './components';
import { Home } from './routes';
import './App.css';
import {API_URL , API_KEY, IMAGE_BASE_URL ,BACKDROP_SIZE, POSTER_SIZE} from './config'

class App extends Component {
  state = {
    loading: false,
    movies: [
      {
        backdrop_path: './images/Fast_large.jpg',
        id: 475557,
        overview:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        poster_path: './images/Fast_small.jpg',
        title: "Fast and Furious"
      },
      {
        backdrop_path: './images/Fast_large.jpg',
        id: 475558,
        overview:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        poster_path: './images/Fast_small.jpg',
        title: "Fast and Furious"
      },
      {
        backdrop_path: './images/Fast_large.jpg',
        id: 475559,
        overview:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        poster_path: './images/Fast_small.jpg',
        title: "Fast and Furious"
      },
      {
        backdrop_path: './images/Fast_large.jpg',
        id: 475560,
        overview:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        poster_path: './images/Fast_small.jpg',
        title: "Fast and Furious"
      },
      {
        backdrop_path: './images/Fast_large.jpg',
        id: 475561,
        overview:
          "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        poster_path: './images/Fast_small.jpg',
        title: "Fast and Furious"
      },
    ],
    image: './images/Fast_large.jpg',
    mTitle: 'Fast and Furious',
    mDesc: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
    activePage: 0,
    totalPages: 0,
    searchText: ""
  }

  async componentDidMount() {
    try {
      const { data : { results, page, total_pages }} = await this.loadMovies();
      console.log('res' , results);
      this.setState({
        movies: results,
        loading: false,
        activePage: page,
        totalPages: total_pages,
        image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
        mTitle: results[0].title,
        mDesc: results[0].overview
      })
    } catch(e){
      console.log('e' , e)
    }
  }

  loadMovies = () => {
    const page = this.state.activePage +1;
    const url = `${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=fr`;
    return axios.get(url);
  }

  handleSearch = (value) => {
    //lancer la recherche
    console.log('handlesearch', value);
  }

  loadMore = async () => {
    try{
      this.setState({ loading: true })
      const { data : { results, page, total_pages }} = await this.loadMovies();
      console.log('res' , results);
      this.setState({
        movies: [...this.state.movies, ...results],
        loading: false,
        activePage: page,
        totalPages: total_pages,
        image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
        mTitle: results[0].title,
        mDesc: results[0].overview
      })
    } catch(e) {
      console.log('error load more', e);
    }
    //lancer une requète
    console.log('load more');
  }

  render(){
    return (
      <div className="App">
        <Header imgSrc="images/quickmovie.svg" />
        <Home
          {...this.state}
          onSearchClick={this.handleSearch}
          onButtonClick={this.loadMore}
        />
      </div>
    );
  }
}

export default App;
