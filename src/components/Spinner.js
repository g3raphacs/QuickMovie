import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faSpinner);

const Spinner = (props) => {
        return(
            <div className="spinnerBox">
                <FontAwesomeIcon
                    icon="spinner"
                    pulse
                    size="3x"
                    className="fa-faSpinner"
                />
            </div>
        )
}

export { Spinner }



                