import React from 'react';
import "../css/MainPage.css";
export const ContentPane = ({header, children, isLoading}) => {
    return (
        <div className='content-pane'>
            <div className={`content-pane-header${isLoading ? " loading" : ""}`}><span>{header}</span></div>
            <div className='content-pane-body'>
                {isLoading ? <div className='loading-animation'>Fetching data...</div> : children}
            </div>
        </div>
    );
};