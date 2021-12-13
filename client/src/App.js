import React from "react";
import "./App.css";
import { Bar, Line } from "react-chartjs-2";
import { useGitUser } from "./api/ApiAccessFunctions";
import { authentication } from "./service/Authentication";
import { GitLoginButton } from "./components/GitLoginButton";
import { GitLogoutButton } from "./components/GitLogoutButton";
import "./css/Background.css";
import "./css/styles.css";
import { MainTitle } from "./components/MainTitle";
const App = () => {
  const [gitJson, setGitJson] = React.useState([]);
  const [user, setUser] = React.useState("");
  const [repoName, setRepo] = React.useState("");
  const [gitUser, updateUser] = useGitUser();

  const fetchUser = () => {
    fetch(`https://api.github.com/users/${user}`, {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("gmv_api_tkn")}`,
        },
        // mode:"cors"
    })
      .then((res) => res.json())
      .then(setGitJson);
  };

  const getRepoData = () => {
    fetch(`https://api.github.com/users/${user}/repos`)
      .then((res) => res.json())
      .then(setGitJson);
  };

  const getCommits = () => {
    fetch(`https://api.github.com/repos/${user}/${repoName}/commits`)
      .then((res) => res.json())
      .then(setGitJson);
  };

  const getBranches = () => {
    fetch(`https://api.github.com/repos/${user}/${repoName}/branches`)
      .then((res) => res.json())
      .then(setGitJson);
  };

  const accum = (json) => {
    let res = {};
    for (let part of json) {
      if (res[part.commit.author.date.split("T")[0]]) {
        res[part.commit.author.date.split("T")[0]] =
          res[part.commit.author.date.split("T")[0]] + 1;
      } else res[part.commit.author.date.split("T")[0]] = 1;
    }
    return res;
  };

  const getDateList = (json) => {
    let res = [];
    for (let part of json) {
      if (!res.includes(part.commit.author.date.split("T")[0])) {
        res.push(part.commit.author.date.split("T")[0]);
      }
    }
    res.sort();
    return res;
  };

  const getSortedDates = () => {
    let dates = getDateList(gitJson);
    let values = accum(gitJson);
    let res = [];
    for (let date of dates) {
      res.push(values[date]);
    }
    console.log(minDate(dates))
    console.log(maxDate(dates))
    console.log(continuousDates(minDate(dates), maxDate(dates)))
    return res;
  };

  const minDate = (dateList) => {
    let min = new Date(dateList[0]);
    for(let i = 1; i < dateList.length; i++) {
      if(min > new Date(dateList[i])) {
        min = new Date(dateList[i]);
      }
    }
    return min;
  }

  const maxDate = (dateList) => {
    let max = new Date(dateList[0]);
    for(let i = 1; i < dateList.length; i++) {
      if(max < new Date(dateList[i])) {
        max = new Date(dateList[i]);
      }
    }
    
    return max;
  }

  const continuousDates = (min, max) => {
    let list = [];
    for(let date = min; date <= max; date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)) {
      list.push(date.toISOString().split("T")[0]);
    }
    list.shift(0);
    list.push(max.toISOString().split("T")[0])
    console.log(list);
    return list;
  }
  const getFullDateList = () => {
    let dates = getDateList(gitJson);
    let fullList = continuousDates(minDate(dates), maxDate(dates));
    let values = accum(gitJson);
    let res = [];
    for (let date of fullList) {
      res.push(values[date]??0);
    }
    console.log("LAST: ", fullList[fullList.length - 1])
    return res;
  }

  const authHandle = async () => {
    const res = await authentication();
    console.log(res);
  }
  return (
    <div className="main">
      <div className="bg-circle c-size-10 circle-clr-red" style={{bottom: "-3em", left:"-3em"}}/>
      <div className="bg-circle c-size-25 circle-clr-blue" style={{top: "-6em", right:"-6em"}}/>
      <div className="bg-circle c-size-15 circle-clr-magenta" style={{top: "2em", left:"1em"}}/>
      <div className="bg-circle c-size-20 circle-clr-green" style={{top: "30%", left:"25%"}}/>
      <div className="bg-circle c-size-5 circle-clr-purple" style={{right: "5em", bottom:"1em"}}/>
      <div className="bg-circle c-size-5 circle-clr-orange" style={{top: "5em", left:"40em"}}/>
      <div className="bg-circle c-size-10 circle-clr-yellow" style={{top: "20em", left:"55em"}}/>
      {/* <button onClick={authHandle}>GitHub Login</button> */}
      {/*
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Github Username"
      />
      <button onClick={() => fetchUser()}>Get User</button>
      <button onClick={() => getRepoData()}>Get Repos</button>
      <input
        type="text"
        value={repoName}
        onChange={(e) => setRepo(e.target.value)}
        placeholder="Repo Name"
      />
      <button onClick={() => getCommits()}>Get Commits</button>
      <button onClick={() => getBranches()}>Get Branches</button> */}
      <MainTitle title="GitHub Metric Visualiser"/>
      <GitLoginButton/>
      <button  onClick={() => {
        fetch("api/test").then(res => res.json()).then(console.log)
      }}>Press</button>
      {/* <GitLogoutButton/> */}
      {/* <pre>
        {JSON.stringify(gitJson, null, 2)}
      </pre> */}
    </div>
  );
};

export default App;
