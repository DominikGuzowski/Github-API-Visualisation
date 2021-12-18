import React from 'react'

export const Profile = ({user}) => {
    return (
        <div style={{display:"flex", flexFlow:"row", width:"100%", justifyContent:"space-between"}}>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexFlow:"column", width:"50%"}}>
            <h3 style={{color:"white"}}>{user?.login}</h3>
            <img style={{borderRadius:"1em"}} src={user?.avatar_url} alt="GitHub User Avatar" width={150}/>
            <p style={{color:"white", fontWeight:"normal", textAlign:"center"}}>{user?.bio}</p>
        </div>
        <div style={{color:"white", fontWeight:"normal",display:"flex", justifyContent:"space-evenly", alignItems:"flex-start", flexFlow:"column",width:"50%", paddingLeft:"2em"}}>
            <span>Followers: {user?.followers}</span>
            <span>Following: {user?.following}</span>
            <span>Public Repos: {user?.public_repos}</span>
            <span>Twitter Name: {user?.twitter_name?user?.twitter_name:"N/A"}</span>
            <span>Created at: {new Date(user?.created_at).toDateString()}</span>
            <span>Profile link: <a style={{color:"#008dd3"}} href={user?.html_url} rel="noreferrer" target="_blank">{user?.html_url}</a></span>
        </div>
    </div>
    )
}
