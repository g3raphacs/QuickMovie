import React from 'react';
import { Link } from 'react-router-dom';

const MenuLink = (props) => {
    return(
        <li>
            <Link to={{ pathname:props.path}}>
                {props.label}
            </Link>
        </li>
    )
}

export { MenuLink }