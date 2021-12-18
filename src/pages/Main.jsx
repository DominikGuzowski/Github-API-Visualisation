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
import { NetworkGraph } from '../components/NetworkGraph';

export const Main = () => {
    const graph = {
        nodes: [
          { id: 'a', label: "Node 1", title: "node 1 tootip text" },
          { id: 'v', label: "Node 2", title: "node 2 tootip text" },
          { id: 'd', label: "Node 3", title: "node 3 tootip text" },
          { id: 'e', label: "Node 4", title: "node 4 tootip text" },
          { id: 'i', label: "Node 5", title: "node 5 tootip text" }
        ],
        edges: [
          { from: 'a', to: 'v' },
          { from: 'a', to: 'e' },
          { from: 'e', to: 'd' },
          { from: 'e', to: 'i' }
        ]
      };
    const [currentUser, setCurrentUser] = React.useState("");
    const [contr, setContr] = React.useState({});
    const [commits, setCommits] = React.useState({});
    const [lang, setLang] = React.useState({});
    const [repos, setRepos] = React.useState({});
    const [user, setUser] = React.useState({});
    const [contributions, setContributions] = React.useState([]);
    const [grp, setGrp] = React.useState({nodes:[], edges:[]});
    React.useEffect(() => {
        git.fetchUserContributions(currentUser).then(({success}) => {
            if(success) setContributions(success.contributions);
        })
        git.fetchRepoContributors("ttl_hotdesking_system", "Keaneyjo").then(({success, error}) => {setContr(success??error)});
        // git.fetchRepoCommits("SpaceInvaders---Processing").then(setCommits);
        git.fetchRepoLanguages("Glass-Calendar---React-JS").then(setLang);
        git.fetchUserRepos().then(setRepos);
        git.fetchUserLanguages().then(setCommits);
        git.fetchUser().then(({success, error}) => {
            if(!error) {
                setUser(success); 
                console.log(success);
            }
        });
        if(sessionStorage.currentUser) setCurrentUser(sessionStorage.currentUser)
        else setCurrentUser(sessionStorage.gmv_usr_inf);
    }, []);
    return (
        <div className='main-wrapper'>
            <div className='aside-gap'/>
            <Header currentUser={currentUser}>
                <MainTitle fontSize="50%" title="GitHub Metric Visualiser"/>
                <SearchBar />
                <div/>
                <GitLogoutButton />
            </Header>
            <Aside>
                {repos?.success?.repos?.map(x => <RepoListing key={x} repoName={x} repoOwner={repos.success.owner} />)}
            </Aside>
            <MainBody>
                <MainHeader>
                    <ContentPane header="GitHub Profile">
                       <Profile user={user} />
                       <button onClick={() => setGrp(graph)}>GRP</button>
                    </ContentPane>
                </MainHeader>
                <MainSplit>
                    <MainSection>
                        <ContentPane>
                            <LineChart dataKeys={['uv', 'pv', 'amt']}/>
                        </ContentPane>
                        <ContentPane header="User Languages Across All Repositories">
                            <PieChart dataSet={commits.languages} valueKey="value" total={commits.total} />
                        </ContentPane>
                    </MainSection>
                    <MainSection>
                        <ContentPane header={`Contributions`}>
                            <Contributions contributions={contributions} currentUser={currentUser} />
                        </ContentPane>
                        <ContentPane header="Followers"></ContentPane>
                        <ContentPane header="Following"></ContentPane>
                        <ContentPane>
                            {/* <pre>{JSON.stringify(repos, null, 2)}</pre> */}
                            <NetworkGraph graph={grp}/>
                        </ContentPane>
                    </MainSection>
                </MainSplit>
            </MainBody> 
        </div>
    );
};