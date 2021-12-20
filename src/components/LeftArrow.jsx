import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import "../css/ArrowButton.css";
export const LeftArrow = ({onClick}) => {
    return (
        <button title="Previous page" className='arrow-button' onClick={() => onClick?.()}><FaArrowLeft/></button>
    )
}
