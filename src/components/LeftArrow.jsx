import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import "../css/ArrowButton.css";
export const LeftArrow = ({onClick, disabled}) => {
    return (
        <button disabled={disabled} title="Previous page" className='arrow-button' onClick={() => onClick?.()}><FaArrowLeft/></button>
    )
}
