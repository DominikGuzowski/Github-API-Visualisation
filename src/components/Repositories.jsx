import React from 'react'
import { RepoListing } from '../components/RepoListing';

export const Repositories = ({data, fetchData, fetchExtraData, maxRepos = 0, setVisible}) => {
    if(!data || Object.entries(data).length === 0) return null;
    return <>
            {data?.repos?.map(x => <RepoListing key={x} repoName={x} repoOwner={data?.owner} onClick={(e) => {
                    setVisible?.();
                    fetchData?.(e);
                }}/>)}
            {data?.repos?.length !== maxRepos && <button className='fetch-more-btn' onClick={() => {
                fetchExtraData?.(data?.owner);
            }}>Fetch more repos</button>}
        </>
}
