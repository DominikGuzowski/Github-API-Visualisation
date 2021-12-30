import React from 'react';
import { StarRating } from './StarRating';
import "../css/Ratings.css"
const clamp = (val, min, max) => {
    if(val < min) return min;
    if(val > max) return max;
    return val;
}
export const Ratings = ({ contributions }) => {
    if(!contributions || contributions.length === 0) return null;
    let value = 0;
    let d = 1;
    // let total = 0;
    let penalty = 0;
    let contrib = 0;
    let cons = 0;
    let consPenalty = 0;
    // let wCount = 1;
    for(const w of contributions) {
        let consCount = 0;
        for(const c of w.contributionDays) {
            if(c.contributionCount > 0) {
                consCount++;
                // contrib += 1 + (c.contributionCount - 1)/4;
            }
            // else penalty += -0.25;
            // total += c.contributionCount;
            value += (c.contributionCount > 0 ? 1.5 : 0) * (d++/365);
        }
        if(consCount >= 5) {
            cons = clamp( cons + 0.5, -5, 10);
            consPenalty = clamp(consPenalty - 0.2, 0, 2);
        } else if(consCount === 0) {
            cons = clamp(cons - consPenalty, -5, 10);
            consPenalty = clamp(consPenalty*1.1 + 0.2, 0, 2);
        } else {
            cons += parseFloat(`0.${consCount}`);
            consPenalty = clamp(consPenalty - parseFloat(`0.00${consCount}`), 0, 2);
        }
    }
    let consistency2 = clamp(cons, 0, 5) * 20;
    let activity = clamp(value / 183, 0, 1) * 100;
    // let consistency = clamp((contrib+penalty)/365, 0, 1) * 100;
    // let average = clamp(total/365, 0, 1) * 100;

    return (
        <div className='ratings'>
            <div className="rating">
                <h3>Activeness</h3>
                <StarRating percentage={activity} />
            </div>
            <div className="rating">
                <h3>Consistency</h3>
                <StarRating percentage={consistency2} />
            </div>
            {/* <div className="rating">
                <h3>Contribution Consistency</h3>
                <StarRating percentage={consistency2} />
            </div> */}
        </div>
    )
}
