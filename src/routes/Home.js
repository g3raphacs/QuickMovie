import React, { Component } from 'react';

const movies = [
    {
      backdrop_path: require('../../public/images/Fast_large.jpg'),
      id: 475557,
      overview:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
      poster_path: require('../../public/images/Fast_small.jpg'),
      title: "Fast and Furious"
    },
    {
      backdrop_path: require('../../public/images/Fast_large.jpg'),
      id: 475558,
      overview:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
      poster_path: require('../../public/images/Fast_small.jpg'),
      title: "Fast and Furious"
    },
    {
      backdrop_path: require('../../public/images/Fast_large.jpg'),
      id: 475559,
      overview:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
      poster_path: require('../../public/images/Fast_small.jpg'),
      title: "Fast and Furious"
    },
    {
      backdrop_path: require('../../public/images/Fast_large.jpg'),
      id: 475560,
      overview:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
      poster_path: require('../../public/images/Fast_small.jpg'),
      title: "Fast and Furious"
    },
];

class Home extends Component{
    render(){
        return(
            <div>Home</div>
        )
    }
}

export { Home };