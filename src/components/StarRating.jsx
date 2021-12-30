import React from 'react';
import "../css/StarRating.css";

export const StarRating = ({percentage = 0}) => {
    const star1 = percentage >= 20  ? 100 : percentage/20 * 100;
    const star2 = percentage >= 40  ? 100 : (percentage - 20)/20 * 100;
    const star3 = percentage >= 60  ? 100 : (percentage - 40)/20 * 100;
    const star4 = percentage >= 80  ? 100 : (percentage - 60)/20 * 100;
    const star5 = percentage >= 100 ? 100 : (percentage - 80)/20 * 100;
    const ratingFill = (rating) => {
        return {backgroundImage: `linear-gradient(90deg, ${percentage === 100 ? "gold" : "#238636"} ${(rating).toFixed(3)}%, transparent ${(rating).toFixed(3)}%)`}
    }
    return (
        <div className='star-rating'
            title={`Rating: ${(5*percentage/100).toFixed(2)}/5.00`}
        >
            <span style={ratingFill(star1)}>★</span>
            <span style={ratingFill(star2)}>★</span>
            <span style={ratingFill(star3)}>★</span>
            <span style={ratingFill(star4)}>★</span>
            <span style={ratingFill(star5)}>★</span>
        </div>
    )
}
