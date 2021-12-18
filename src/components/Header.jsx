import React from 'react';
import "../css/Header.css";
import {user} from "../api/ApiAccessFunctions";
export const Header = ({children, currentUser = ""}) => {
    return (
        <header aria-label={currentUser||user()}>    
            {children}
        </header>
    )
}
