import React from 'react';
import "../css/MainPage.css";
export const ContentPane = ({header, children}) => {
    return (
        <div className='content-pane'>
            <div className='content-pane-header' style={{color:"white"}}>{header}</div>
            <div className='content-pane-body'>
                {children}  
            </div>
        </div>
    );
};