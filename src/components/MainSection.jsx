import React from 'react'
import "../css/MainPage.css";

export const MainSection = ({children}) => {
    return (
        <div className='main-section'>
            {children}
        </div>
    )
}
