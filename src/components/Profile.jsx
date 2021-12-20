import React from 'react';
import "../css/Profile.css";
export const Profile = ({user}) => {
    return (
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
            <span>Twitter Name: {user?.twitter_name?user?.twitter_name:"N/A"}</span>
            <span>Created at: {new Date(user?.created_at).toDateString()}</span>
            <span>Profile link: <a href={user?.html_url} rel="noreferrer" target="_blank">{user?.html_url}</a></span>
        </div>
    </div>
    )
}
