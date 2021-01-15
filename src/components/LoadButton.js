import React, { Component } from 'react';
import { Spinner } from './Spinner';


import '../css/LoadButton.css';

const LoadButton = (props) =>{
    return(
        <>
        {props.loading ? (
                <Spinner/>
        ) : (
            <div className="loadButton"></div>
        )}
        </>
    )
}

export { LoadButton }