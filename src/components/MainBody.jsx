import React from 'react';
import "../css/MainPage.css";

export const MainBody = ({children}) => {
    return (
        <div className='main-page'>
            {children}
        </div>
    )
}
