import React, { Component } from 'react';
import { Header } from './components';
import { Home } from './routes';
import './App.css';
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
  handleSearch = (value) => {
    //lancer la recherche
    console.log('handlesearch', value);
  }
  loadMore = () => {
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
