import React from 'react';
import "../css/Aside.css";

export const Aside = ({children, isLoading}) => {
    return (
        <div className='aside'>
            <span className={`aside-title${isLoading ? " loading" : ""}`}>Public Repositories</span>
            <div className='aside-list'>
                {children}
            </div>
        </div>
    )
}
