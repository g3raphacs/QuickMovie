import React, { Component } from 'react';
import { HeaderImg } from '../components';

const movies = [
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
      id: 475557,
      overview:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
      poster_path: './images/Fast_small.jpg',
      title: "Fast and Furious"
    },
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
      id: 475557,
      overview:
        "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
      poster_path: './images/Fast_small.jpg',
      title: "Fast and Furious"
    }
];

class Home extends Component{
    render(){
        return(
            <div>
                <HeaderImg
                    title="Fast and Furious"
                    overview="Des grosses voitures, des jolies filles, de l’action, des cascades spectaculaires : bienvenue dans la dernière itération de la saga Fast and Furious. La franchise s’est installée comme..."
                    imgSrc={"./images/Fast_large.jpg"}
                />
            </div>
        )
    }
}

export { Home };