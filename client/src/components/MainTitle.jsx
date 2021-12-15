import React from 'react';
import "../css/MainTitle.css";
export const MainTitle = ({title = ""}) => {
    
    return (
            <div style={{display:"flex", flexWrap:"wrap", flexFlow:"row", justifyContent:"space-around"}}>
                {title.split(" ").map((x) => <div className='main-title'>{x}</div>)}
            </div>      
    )
}

