import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { GitLink } from './GitLink';
import { Repository } from './Repository';

export const RepoListing = ({repoName = "", repoOwner = ""}) => {
    if(repoName && repoOwner)
    return (
        <div className='repo-listing'>
            <GitLink repository={repoName} owner={repoOwner}/>
            <Repository name={repoName}/>
        </div>
    )
}
