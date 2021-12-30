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
import { Repositories } from '../components/Repositories';
import { LanguageList } from '../components/LanguageList';
import { HamburgerButton } from '../components/HamburgerButton';
import { RangeSlider } from '../components/RangeSlider';
import { ToggleGroup } from '../components/ToggleGroup';
export const Main = () => {
    const fetchUserReposPaged = (username) => {
        if(!username) {
            console.log(username, "ERROR")
            return;
        }
        setReposLoading(true);
        git.fetchPagedRepos(username, repos?.owner !== username ? 1 : reposPage).then(({success}) => {
            setReposLoading(false);
            if(!success) return;
            if(Object.entries(repos).length === 0 || repos?.owner !== username) {
                setRepos(success);
                setReposPage(2);
            }
            else {
                setRepos({
                    owner: repos.owner,
                    repos: [
                        ...repos.repos,
                        ...success.repos
                    ]
                })
                setReposPage(reposPage + 1);
            }
        }).catch((e) => {console.error(e); setReposLoading(false)});
    }
    const fetchNewUser = async (username) => {
        git.fetchPagedRepos(username, 1).then(console.warn)
        setCurrentUserLoading(true);
        git.fetchUser(username).then(({success: gitUser, error}) => {
            setCurrentUserLoading(false);
            if(error) {
                console.error(error);
                document.getElementById("error-message").classList.add("visible");
                setTimeout(() => {
                    document.getElementById("error-message").classList.remove("visible");
                }, 1500);
                return;
            } else clearAllData();
            setContr({});
            setContributions([]);
            let user = gitUser.login;
            setTimelineLoading(true);
            git.fetchContributionTimeline(user, gitUser.created_at).then((data) => {
                setTimelineLoading(false);
                setTimeline(data);
                setTimelineData(data.data);
                setTimelineKeys(data.dataKeys);
            }).catch((e) => {
                console.error(e)
                setTimelineLoading(false);
            });
            setCurrentUser(gitUser);
            sessionStorage.setItem("currentUser", user);
            setContributionsLoading(true);
            git.fetchUserContributions(user).then(({success, error}) => {
                setContributionsLoading(false);
                if(success) setContributions(success.contributions);
            });
            setLangLoading(true);
            git.fetchUserLanguagesGQL(user).then(({success}) => {
                setLangLoading(false);
                if(success) setLang(success);
                console.log(success)
            });
            fetchUserReposPaged(user);
            setFollowersLoading(true);
            git.fetchPagedFollowers(user, 1).then(({success}) => {
                const f = success?.map(({login}) => ({name: login, value: 1}))
                setFollowersLoading(false);
                if(success) {
                    setFollowers(f);
                }
            }).catch(() => setFollowersLoading(false));
            setFollowingLoading(true);
            git.fetchFollowing(user).then(({success}) => {
                const f = success?.map(({login}) => ({name: login, value: 1}))
                setFollowingLoading(false);
                if(success) {
                    setFollowing(f);
                }
            }).catch(() => setFollowingLoading(false));
            git.fetchYearContributions(user).then(setUserActivity).catch(console.error);
            window.scrollTo(0, 0);
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
        });
        setCommitDaysLoading(true);
        git.fetchRepoStatsCommits(repoName, repoOwner).then(({success}) => {
            setCommitDaysLoading(false);
            if(success) setCommitDays(success);
        }).catch(() => {
            setCommitDaysLoading(false);
            setCommitDays({});
        });
        git.fetchRepoContributors(repoName, repoOwner).then(({success}) => {
            if(success) {
                setRepoContributions(success);
            }
        });
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
        setUserActivity([]);
        setReposPage(1);
        setTimeline([]);
        setMonthRange([0, 11]);
        setTimelineKeys([]);
        setTimelineData([]);
    };
    const [hamburgerToggle, setHamburgerToggle] = React.useState(0);
    const [asideVisible, setVisible] = React.useState(false);
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
    const [reposPage, setReposPage] = React.useState(1);
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
    const [userActivity, setUserActivity] = React.useState([]);
    const [pieToggle, setPieToggle] = React.useState(true);
    const [contributionTimeline, setTimeline] = React.useState([]);
    const [timelineLoading, setTimelineLoading] = React.useState(false);
    const [monthRange, setMonthRange] = React.useState([0, 11]);
    const [timelineKeys, setTimelineKeys] = React.useState([]);
    const [timelineData, setTimelineData] = React.useState([]);

    const onToggleChange = (change) => {
        const newKeys = contributionTimeline.dataKeys.filter((_, i) => change[i]).sort();
        setTimelineKeys(newKeys);
    }

    const onMonthChange = (e) => {
        setMonthRange(e);
        filterMonths(e);
    }
    const fetchUserActivity = (year) => {
        if(year === "last") {
            git.fetchYearContributions(currentUser.login).then(setUserActivity).catch(console.error);
        } else {
            git.fetchYearContributionsFrom(currentUser.login, year).then(setUserActivity).catch(console.error);
        }
    }
    const focusListener = function(e) {
        if(e.key === " " && e.ctrlKey) {
            document.getElementById("#firstContent").focus();
        }
    }

    const filterMonths = (range = monthRange) => {
        const min = range[0];
        const max = range[1];
        let filtered = contributionTimeline.data.filter(({name}) => {
            const month = new Date(name + " 2000").getMonth();
            return min <= month && month <= max;
        });
        setTimelineData(filtered);
    }
    React.useEffect(() => {
        if(sessionStorage.currentUser) fetchNewUser(sessionStorage.currentUser)
        else fetchNewUser(sessionStorage.gmv_usr_inf)

        document.addEventListener("keydown", focusListener);
        return (() => document.removeEventListener("keydown", focusListener));
    }, []);

    return (
        <div className='main-wrapper'>
            <div className="aside-gap"></div>
            <div className='notif'>Press <code>Ctrl/Cmd + Space</code> to auto-focus on the search bar!</div>
            <Header currentUser={currentUser}>
                <HamburgerButton onClick={(e) => setVisible(e)} toggled={hamburgerToggle}/>
                <MainTitle fontSize="50%" title="GitHub Metric Visualiser" onClick={() => {
                    fetchNewUser(sessionStorage.getItem("gmv_usr_inf"));
                }}/>
                <SearchBar onClick={fetchNewUser}/>
                <div/>
                <GitLogoutButton />
            </Header>

            <MainBody>
                <MainHeader>
                    <ContentPane header="GitHub Profile" isLoading={currentUserLoading}>
                       <Profile user={currentUser} contributions={userActivity} onYearClick={fetchUserActivity}/>
                    </ContentPane>
                </MainHeader>
                <MainSplit>
                    <MainSection>
                        <ContentPane header="User Languages Across All Repositories" isLoading={langLoading}>
                            <div style={{display:"flex", width:"100%", justifyContent:"center", padding:"0.5rem"}}>
                            <button className='toggle-button'
                                    onClick={() => setPieToggle(!pieToggle)}>{pieToggle?"View as List":"View as Pie"}</button>
                            </div>
                            
                            {pieToggle ? <PieChart dataSet={lang.languages} valueKey="value" total={lang.total} /> :
                            <LanguageList languages={lang.languages} total={lang.total}/>}
                        </ContentPane>
                        <ContentPane header="Activity by Day of Week (Last 52 Weeks)" isLoading={commitDaysLoading}>
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
                        <ContentPane header={`Contributions`} isLoading={contributionsLoading}>
                                <Contributions contributors={contr.data} contributedRepos={contributions} currentUser={currentUser} onSelect={(e) => {
                                    git.fetchRepoContributors(e.repo, e.owner).then(({success}) => setContr(success))
                                }} onUserSelect={fetchNewUser}/>
                        </ContentPane>
                        <ContentPane header="Followers" isLoading={followersLoading}>
                                {followers?.length > 0 && <div style={{display:"flex", flexFlow:"row"}}>
                                    <LeftArrow 
                                        disabled={followersPage === 1}
                                        onClick={() => {
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
                                    <RightArrow 
                                        disabled={(followersPage-1)*20 + followers.length === currentUser?.followers}
                                        onClick={() => {
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
                                {/* <DonutChart/> */}
                            </ContentPane>
                            <ContentPane header="Following" isLoading={followingLoading}>
                            {following?.length > 0 && <div style={{display:"flex", flexFlow:"row"}}>
                                    <LeftArrow 
                                        disabled={followingPage === 1}
                                        onClick={() => {
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
                                    <RightArrow 
                                        disabled={(followingPage-1)*20 + following.length === currentUser?.following}
                                        onClick={() => {
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
                            <ContentPane header="Year-to-Year Contributions Comparison" isLoading={timelineLoading}>
                                <LineChart dataSet={timelineData} dataKeys={timelineKeys} xAxisKey={"name"}/>
                                <RangeSlider min={0} max={11} gap={0} showLabels={true} labels={months} onUpdate={(e) => onMonthChange(e)}/>
                                <ToggleGroup group={contributionTimeline.dataKeys} onUpdate={onToggleChange} />
                            </ContentPane>
                    </MainSection>
                </MainSplit>
            </MainBody> 
            <Aside isLoading={reposLoading} visible={asideVisible}>
                <Repositories data={repos} setVisible={() => setHamburgerToggle(hamburgerToggle + 1)} fetchData={fetchRepoData} fetchExtraData={fetchUserReposPaged} maxRepos={currentUser?.public_repos} />
            </Aside>
        </div>
    );
};

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];