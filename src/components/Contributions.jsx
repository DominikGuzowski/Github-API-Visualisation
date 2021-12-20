import React from 'react';
import { RadarChart } from "./RadarChart";
import "../css/styles.css";

export const Contributions = ({contributedRepos, currentUser, onUserSelect, onSelect, contributors}) => {
    if(!contributedRepos || contributedRepos.length === 0) return <h3>Hmm, seems there are no contributions, huh?</h3>;
    return (
        <>
            <select className='select-contribs' defaultValue="" onChange={(e) => {onSelect?.(JSON.parse(e.target.value))}}>
                <option className="contrib-options" value="" disabled>Select a repository</option>
                {contributedRepos.map((x, i) => <option key={x.name+i} value={JSON.stringify({owner: x.owner.login, repo: x.name})}>{x.name}</option>)}
            </select>
            <RadarChart onUserSelect={e => onUserSelect?.(e)} currentUser={currentUser} dataSet={contributors} radarName="Contributions" polarAxis="login" dataKey="contributions"/>
        </>
    )
}
