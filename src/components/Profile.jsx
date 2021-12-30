import React from 'react';
import "../css/Profile.css";
import { HeatMap } from './HeatMap';
import { Ratings } from './Ratings';
export const Profile = ({user, onYearClick, contributions, score}) => {
    const [btnSel, setSel] = React.useState("ly");

    const getYearButtons = () => {
        const createdYear = new Date(user?.created_at).getFullYear();
        const currentYear = new Date().getFullYear();
        let arr = [];
        arr.push(<button className="year-button" key="ly" onClick={() => {
            onYearClick?.("last");
            setSel("ly");
        }} disabled={btnSel === "ly"}>Last Year</button>)

        for(let year = currentYear; year >= createdYear; year--) {
            arr.push(<button className="year-button" key={year} onClick={() => {
                    onYearClick?.(year);
                    setSel(year);
                }} disabled={btnSel === year}>{year}</button>)
        }
        return arr;
    }
    return (
    <div className='profile'>
        <div className='profile-wrapper'>
            <div className='profile-left'>
                <h3>{user?.login}</h3>
                <img src={user?.avatar_url} alt="GitHub User Avatar" width={150}/>
                <p>{user?.bio}</p>
            </div>
            <div className='profile-right'>
                <span>Followers: {user?.followers}</span>
                <span>Following: {user?.following}</span>
                <span>Public Repos: {user?.public_repos}</span>
                {/* <span>Twitter Name: {user?.twitter_name?user?.twitter_name:"N/A"}</span> */}
                <span>Created at: {new Date(user?.created_at).toDateString()}</span>
                <span>Profile link: <a href={user?.html_url} rel="noreferrer" target="_blank">{user?.html_url}</a></span>
            </div>
        </div>
        {(contributions?.weeks?.length > 0) && <div className="profile-column">
            <div className="profile-row">
                {getYearButtons().map(x => x)}
            </div>
            <span style={{fontWeight:"normal", marginBottom:"0"}}>{contributions.totalContributions} contribution{contributions.totalContributions !== 1 && "s"} in {btnSel === "ly" ? "the last year" : btnSel}</span>
            <div className="profile-bottom">
                <HeatMap contributions={contributions?.weeks} />
            </div>
            <Ratings contributions={contributions?.weeks} />
        </div>}
    </div>
    )
}
