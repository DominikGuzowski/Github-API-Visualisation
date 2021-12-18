import React from 'react';
import { RadarChart } from "./RadarChart";
import "../css/styles.css";

export const Contributions = ({contributions, currentUser}) => {
    if(contributions.length !== 0) return <h3>Hmm, seems there are no contributions, huh?</h3>;
    return (
        <div>
            <select className='select-contribs' >
                <option className="contrib-options" value="" disabled selected>Select repository</option>
                <option className="contrib-options" value="a">A</option>
                <option className="contrib-options" value="b">B</option>
                <option className="contrib-options" value="c">C</option>
            </select>
            {/* <RadarChart onUserSelect={e => console.log(e)} currentUser={currentUser} dataSet={contributions} radarName="Contributions" polarAxis="login" dataKey="contributions"/> */}
        </div>
    )
}
