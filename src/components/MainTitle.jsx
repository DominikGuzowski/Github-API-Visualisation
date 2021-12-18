import React from 'react';
import "../css/MainTitle.css";
export const MainTitle = ({title = "", fontSize}) => {
    
    return (
        <div style={{display:"flex", flexWrap:"wrap", flexFlow:"row", justifyContent:"space-around", fontSize}}>
            {title.split(" ").map((x) => <div className='main-title'>{x}</div>)}
        </div>      
    )
}