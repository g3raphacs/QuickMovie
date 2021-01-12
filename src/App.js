import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router , Route, Switch, Link } from 'react-router-dom';

import { Header } from './components';
import { Home } from './routes';
import './App.css';
import {API_URL , API_KEY, IMAGE_BASE_URL ,BACKDROP_SIZE, POSTER_SIZE} from './config'

class App extends Component {
  state = {
    scrollX: 0,
    scrollY: 0,
    newLoad: false,
    searching:false,
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
      this.setState({
        movies: results,
        loading: false,
        activePage: page,
        totalPages: total_pages,
        image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
        mTitle: results[0].title,
        mDesc: results[0].overview
      })

      window.addEventListener('scroll', this.handleScroll);

    } catch(e){
      console.log('e' , e)
    }
  }

  handleScroll = () => {
    if(!this.state.loading){
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.loadMore();
      }
    }else{
      window.scrollTo(this.state.scrollX, this.state.scrollY);
    }
  }

  toggleSearchButton = () => {
    const toggle = !this.state.searching;
    this.setState({searching: toggle})
  }
  loadMovies = () => {
    const page = this.state.activePage +1;
    const url = `${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=fr`;
    return axios.get(url);
  }

  searchMovie = () => {
    const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${this.state.searchText}&language=fr`;
    return axios.get(url);
  }

  handleSearch = (value) => {
    //lancer la recherche
    try {
      this.setState({
        searching: false,
        loading: true,
        searchText: value,
        image: null
      }, async () => {
        const { data : { results, page, total_pages }} = await this.searchMovie();
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
      })
    } catch(e){
      console.log('e' , e)
    }
  }

  loadMore = async () => {
    try{
      this.setState({ loading: true })
      this.setState({ scrollX: window.scrollX, scrollY: window.scrollY, newLoad: true});
      const { data : { results, page, total_pages }} = await this.loadMovies();
      this.setState({
        movies: [...this.state.movies, ...results],
        loading: false,
        activePage: page,
        totalPages: total_pages,
        image: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
        mTitle: results[0].title,
        mDesc: results[0].overview,
        newLoad: false
      })
    } catch(e) {
      console.log('error load more', e);
    }
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Header onSearchButton={this.toggleSearchButton} searching={this.state.searching} imgSrc="images/quickmovie.svg" />
          <Switch>
            <Route path="/">
              <Home
                  {...this.state}
                  onSearchClick={this.handleSearch}
                />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
