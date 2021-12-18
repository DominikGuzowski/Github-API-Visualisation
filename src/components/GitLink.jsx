import React from 'react';
import { FaGithub } from 'react-icons/fa';
import "../css/Aside.css"
export const GitLink = ({repository, owner, children}) => {
    return (
        <a className='git-link'
            rel="noreferrer" target="_blank" href={`https://github.com/${owner}${repository?"/"+repository:""}`}
            title="Visit repository on GitHub"
        >
            <FaGithub/>
        </a>
    )
}
