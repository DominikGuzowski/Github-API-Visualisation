import React from 'react';
import { GitLink } from './GitLink';
import { Repository } from './Repository';

export const RepoListing = ({repoName = "", repoOwner = "", onClick}) => {
    if(repoName && repoOwner)
    return (
        <div className='repo-listing'>
            <GitLink repository={repoName} owner={repoOwner}/>
            <Repository name={repoName} data={{repoOwner,repoName}} onClick={onClick}/>
        </div>
    )
}
