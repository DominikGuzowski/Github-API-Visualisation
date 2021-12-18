import React from 'react'
import { signout } from "../service/Authentication";
import "../css/GitHubLoginButton.css";
import {FaGithub} from "react-icons/fa";
export const GitLogoutButton = ({getData}) => {

    const handleAuthentication = async () => {
        await signout();
    }

    return (
        <button className='github-login-button' onClick={handleAuthentication} style={{backgroundColor:"#f02030"}}>
             <FaGithub style={{fontSize:"1.625em", marginRight:"0.25em"}}/> Log Out
        </button>
    )
}
