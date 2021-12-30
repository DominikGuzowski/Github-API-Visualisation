import React from 'react';
import "../css/MainTitle.css";
export const MainTitle = ({title = "", fontSize, onClick}) => {
    
    return (
        <div className="main-title-wrapper"
            onClick={onClick}>
            {title.split(" ").map((x) => <div key={x} className='main-title'>{x}</div>)}
        </div>      
    )
}