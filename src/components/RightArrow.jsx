import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import "../css/ArrowButton.css";
export const RightArrow = ({onClick, disabled}) => {
    return (
        <button disabled={disabled} title="Next page" className='arrow-button' onClick={() => onClick?.()}><FaArrowRight/></button>
    )
}
