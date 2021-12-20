import React from 'react';
import { FaSearch } from 'react-icons/fa';
import "../css/SearchBar.css";
export const SearchBar = ({onClick}) => {
    const [data, setData] = React.useState("");
    return (
        <div className='search-bar'>
            <input className='search-input' onChange={(e) => {
                setData(e.target.value)
            }} placeholder='Search user on GitHub' onKeyPress={(e) => {
                if(e.key === "Enter") {
                    onClick?.(data)
                }
            }}></input>
            <button className='search-button' onClick={() => onClick?.(data)}><FaSearch/></button>
        </div>
    )
}
