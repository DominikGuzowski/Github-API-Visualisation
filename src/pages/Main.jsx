import React from 'react';
import "../css/MainPage.css"
import { LineChart } from "../components/LineChart";
import { RadarChart } from '../components/RadarChart';
import * as git from "../api/ApiAccessFunctions";
import { ContentPane } from '../components/ContentPane';
import { PieChart } from '../components/PieChart';
import { MainTitle } from '../components/MainTitle';
import { Header } from '../components/Header';
import {FaGithub} from "react-icons/fa";
import { SearchBar } from '../components/SearchBar';
import { Aside } from "../components/Aside";
import { MainBody } from "../components/MainBody";
import { RepoListing } from '../components/RepoListing';
import { GitLogoutButton } from "../components/GitLogoutButton";
import { MainHeader } from '../components/MainHeader';
import { MainSplit } from '../components/MainSplit';
import { MainSection } from '../components/MainSection';
import { Profile } from '../components/Profile';
import { Contributions } from '../components/Contributions';
import { Areachart } from '../components/Areachart';
import { Barchart } from '../components/Barchart';
import { SunburstChart } from '../components/SunburstChart';
import { LeftArrow } from '../components/LeftArrow';
import { RightArrow } from '../components/RightArrow';

export const Main = () => {

    const fetchNewUser = async (username) => {
        setCurrentUserLoading(true);
        git.fetchUser(username).then(({success: gitUser, error}) => {
            setCurrentUserLoading(false);
            if(error) {
                console.error(error);
                return;
            } else clearAllData();
            setContr({});
            setContributions([]);
            let user = gitUser.login;
            setCurrentUser(gitUser);
            sessionStorage.setItem("currentUser", user);
            setContributionsLoading(true);
            git.fetchUserContributions(user).then(({success, error}) => {
                setContributionsLoading(false);
                if(success) setContributions(success.contributions);
            });
            setLangLoading(true);
            git.fetchUserLanguages(user).then((success) => {
                setLangLoading(false);
                if(success) setLang(success);
            });
            setFollowersLoading(true);
            git.fetchFollowers(user).then(({success}) => {
                setFollowersLoading(false);
                if(success) setFollowers(success);
            });
            setReposLoading(true);
            git.fetchUserRepos(user).then(({success}) => {
                setReposLoading(false);
                if(success) setRepos(success);
            })
            setFollowersLoading(true);
            git.fetchPagedFollowers(user, 1).then(({success}) => {
                const f = success?.map(({login}) => ({name: login, value: 1}))
                setFollowersLoading(false);
                if(success) {
                    setFollowers(f);
                }
            }).catch(() => setFollowersLoading(false))
            setFollowingLoading(true);
            git.fetchFollowing(user).then(({success}) => {
                const f = success?.map(({login}) => ({name: login, value: 1}))
                setFollowingLoading(false);
                if(success) {
                    setFollowing(f);
                }
            }).catch(() => setFollowingLoading(false))
        }).catch(console.error)
    }

    const fetchRepoFrequency = (repoName, repoOwner) => {
        setCodeFreqLoading(true);
        git.fetchRepoStatsCodeFrequency(repoName, repoOwner).then(({success}) => {
            setCodeFreqLoading(false);
            if(!success) 
            {
                setCodeFreq([]);
            }
            else setCodeFreq(success);
        }).catch(() => {
            setCodeFreqLoading(false);
            setCodeFreq([]);
        })
        setCommitDaysLoading(true);
        git.fetchRepoStatsCommits(repoName, repoOwner).then(({success}) => {
            setCommitDaysLoading(false);
            if(success) setCommitDays(success);
        }).catch(() => {
            setCommitDaysLoading(false);
            setCommitDays({});
        })
        git.fetchRepoContributors(repoName, repoOwner).then(({success}) => {
            if(success) {
                setRepoContributions(success);
            }
        })
    }

    const fetchRepoData = (data) => {
        fetchRepoFrequency(data.repoName, data.repoOwner);
    }
    const clearAllData = () => {
        setCurrentUser("");
        setCommitDays({});
        setFollowers([]);
        setFollowing([]);
        setFollowersPage(1);
        setFollowingPage(1);
        setCodeFreq([]);
        setRepos({});
        setLang({});
        setContributions([]);
        setRepoContributions([]);
    }
    const [followers, setFollowers] = React.useState([]);
    const [followersLoading, setFollowersLoading] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState("");
    const [currentUserLoading, setCurrentUserLoading] = React.useState(false);
    const [contr, setContr] = React.useState({});
    const [contrLoading, setContrLoading] = React.useState(false);
    const [commits, setCommits] = React.useState({});
    const [lang, setLang] = React.useState({});
    const [langLoading, setLangLoading] = React.useState(false);
    const [repos, setRepos] = React.useState({});
    const [reposLoading, setReposLoading] = React.useState(false);
    const [contributions, setContributions] = React.useState([]);
    const [contributionsLoading, setContributionsLoading] = React.useState(false);
    const [codeFreq, setCodeFreq] = React.useState([]);
    const [codeFreqLoading, setCodeFreqLoading] = React.useState(false);
    const [commitDays, setCommitDays] = React.useState({});
    const [commitDaysLoading, setCommitDaysLoading] = React.useState(false);
    const [following, setFollowing] = React.useState([]);
    const [followingLoading, setFollowingLoading] = React.useState(false);
    const [followersPage, setFollowersPage] = React.useState(1);
    const [followingPage, setFollowingPage] = React.useState(1);
    const [userRepoContributions, setRepoContributions] = React.useState([]);
    // const [userRepoContributions, setRepoContributions] = React.useState([]);

    React.useEffect(() => {
        if(sessionStorage.currentUser) fetchNewUser(sessionStorage.currentUser)
        else fetchNewUser(sessionStorage.gmv_usr_inf)
    }, []);

    const setNewUser = (user) => {
        sessionStorage.setItem("currentUser", user);
        window.location.reload();
    }

    return (
        <div className='main-wrapper'>
            <div className='aside-gap'/>
            <Header currentUser={currentUser}>
                <MainTitle fontSize="50%" title="GitHub Metric Visualiser"/>
                <SearchBar onClick={fetchNewUser}/>
                <div/>
                <GitLogoutButton />
            </Header>
            <Aside isLoading={reposLoading}>
                {repos?.repos?.map(x => <RepoListing key={x} repoName={x} repoOwner={repos?.owner} onClick={(e) => {
                    fetchRepoData(e);
                }}/>)}
            </Aside>
            <MainBody>
                <MainHeader>
                    <ContentPane header="GitHub Profile" isLoading={currentUserLoading}>
                       <Profile user={currentUser} />
                    </ContentPane>
                </MainHeader>
                <MainSplit>
                    <MainSection>
                        <ContentPane header="User Languages Across All Repositories" isLoading={langLoading}>
                            <PieChart dataSet={lang.languages} valueKey="value" total={lang.total} />
                        </ContentPane>
                        <ContentPane header="Commits by Day of Week (Last 52 Weeks)" isLoading={commitDaysLoading}>
                            {/* <LineChart dataKeys={[]}/> */}
                            {commitDays.repo && <h3 className="text-constrain">{commitDays.repo}</h3>}
                            <Barchart dataSet={commitDays.dayOfWeek} dataKey="value" xAxis="name"/>
                        </ContentPane>
                        <ContentPane header={`Code Frequency${codeFreq.data? ` for ${codeFreq.repo}` : ""}`} isLoading={codeFreqLoading}>
                            <Areachart data={codeFreq.data} dataKeyOne="additions" dataKeyTwo="deletions" xAxisKey="date" />
                        </ContentPane>
                        {userRepoContributions?.data?.length > 1 && <ContentPane header={`Contributions by Others to ${userRepoContributions.repository}`}>
                            <RadarChart dataSet={userRepoContributions.data} currentUser={currentUser} onUserSelect={fetchNewUser}
                            radarName="Contributions" polarAxis="login" dataKey="contributions" customColor="#008dd3"/>
                        </ContentPane>}
                    </MainSection>
                    <MainSection>
                    <ContentPane header="Followers" isLoading={followersLoading}>
                            {followers?.length > 0 && <div style={{display:"flex", flexFlow:"row"}}>
                                <LeftArrow onClick={() => {
                                    if(followersPage !== 1)
                                    git.fetchPagedFollowers(currentUser.login, followersPage - 1).then(({success}) => {
                                        if(success) {
                                            setFollowersPage(followersPage - 1);
                                            if(success.length !== 0) {
                                                const f = success?.map(({login}) => ({name: login, value: 1}))
                                                setFollowers(f);
                                            }
                                        }
                                    })
                                }}/>
                                <RightArrow onClick={() => {
                                    git.fetchPagedFollowers(currentUser.login, followersPage + 1).then(({success}) => {
                                        if(success) {
                                            if(success.length !== 0) {
                                                setFollowersPage(followersPage + 1);
                                                const f = success?.map(({login}) => ({name: login, value: 1}))
                                                setFollowers(f);
                                            }
                                        }
                                    })
                                }}/>
                            </div>}
                            <SunburstChart dataSet={followers} dataKey="value" username={currentUser?.login} onClick={fetchNewUser}/>
                        </ContentPane>
                        <ContentPane header="Following" isLoading={followingLoading}>
                        {following?.length > 0 && <div style={{display:"flex", flexFlow:"row"}}>
                                <LeftArrow onClick={() => {
                                    if(followingPage !== 1)
                                    git.fetchPagedFollowing(currentUser.login, followingPage - 1).then(({success}) => {
                                        if(success) {
                                            setFollowingPage(followingPage - 1);
                                            if(success.length !== 0) {
                                                const f = success?.map(({login}) => ({name: login, value: 1}))
                                                setFollowing(f);
                                            }
                                        }
                                    })
                                }}/>
                                <RightArrow onClick={() => {
                                    git.fetchPagedFollowing(currentUser.login, followingPage + 1).then(({success}) => {
                                        if(success) {
                                            if(success.length !== 0) {
                                                setFollowingPage(followingPage + 1);
                                                const f = success?.map(({login}) => ({name: login, value: 1}))
                                                setFollowing(f);
                                            }
                                        }
                                    })
                                }}/>
                            </div>}
                            <SunburstChart dataSet={following} dataKey="value" username={currentUser?.login} onClick={fetchNewUser}/>
                        </ContentPane>
                        <ContentPane header={`Contributions`} isLoading={contributionsLoading}>
                            <Contributions contributors={contr.data} contributedRepos={contributions} currentUser={currentUser} onSelect={(e) => {
                                git.fetchRepoContributors(e.repo, e.owner).then(({success}) => setContr(success))
                            }} onUserSelect={setNewUser}/>
                        </ContentPane>
                    </MainSection>
                </MainSplit>
            </MainBody> 
        </div>
    );
};