import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import "../css/ArrowButton.css";
export const RightArrow = ({onClick}) => {
    return (
        <button title="Next page" className='arrow-button' onClick={() => onClick?.()}><FaArrowRight/></button>
    )
}
