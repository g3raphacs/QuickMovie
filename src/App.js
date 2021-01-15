import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import { Header ,LoadButton } from './components';
import { Home, Details, NotFound, MoviePlayer } from './routes';
import './App.css';
import {API_URL , API_KEY, IMAGE_BASE_URL ,BACKDROP_SIZE} from './config'

class App extends Component {
  state = {
    scrollX: 0,
    scrollY: 0,
    newLoad: false,
    searching:false,
    loading: true,
    movies: [],
    image: null,
    mTitle: '',
    mDesc: '',
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
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header onSearchButton={this.toggleSearchButton} searching={this.state.searching} imgSrc= {'/images/quickmovie.svg'} />
            {!this.state.image ? (
              <div className="fullscreenLoad">
                <LoadButton loading={this.state.loading}/>
              </div>
            ) : (
            <Switch>
              <Route exact path="/">
                <Home
                    {...this.state}
                    title="Nouveautés"
                    onSearchClick={this.handleSearch}
                  />
              </Route>

              <Route exact path="/player"  render={(props)=><MoviePlayer {...props}/>}></Route>

              <Route exact path="/player/:id"  render={(props)=><MoviePlayer {...props}/>}></Route>

              <Route exact path="/:id" render={(props)=><Details {...props}/>}></Route>

              <Route>
                  <NotFound/>
              </Route>
            </Switch>
            )}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
