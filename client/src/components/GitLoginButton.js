import React from 'react'
import { authentication } from "../service/Authentication";
import "../css/GitHubLoginButton.css";
import {FaGithub} from "react-icons/fa";
export const GitLoginButton = ({getData}) => {

    const handleAuthentication = async () => {
        const auth = await authentication();
        getData?.(auth);
    }

    return (
        <button className='github-login-button' onClick={handleAuthentication}>
             <FaGithub style={{fontSize:"1.625em", marginRight:"0.25em"}}/> Log in with GitHub
        </button>
    )
}
