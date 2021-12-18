import React from 'react';
import { FaSearch } from 'react-icons/fa';
import "../css/SearchBar.css";
export const SearchBar = ({onClick}) => {
    return (
        <div className='search-bar'>
            <input className='search-input' placeholder='Search user on GitHub'></input>
            <button className='search-button' onClick={() => onClick?.()}><FaSearch/></button>
        </div>
    )
}
