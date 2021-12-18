import React from 'react';
import "../css/Aside.css";

export const Aside = ({children}) => {
    return (
        <div className='aside'>
            <span className='aside-title'>Repositories</span>
            <div className='aside-list'>{children}</div>
        </div>
    )
}
