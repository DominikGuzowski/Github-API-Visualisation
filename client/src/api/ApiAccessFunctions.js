import React from 'react';


export const useGitUser = (userGitName = '') => {
    const reducFunction = (previousState, userName) => {
        if(userName.length === 0) return previousState;
        let userData = null;
        let userRepos = null;
        fetch(`https://api.github.com/users/${userName}`)
              .then((res) => res.json())
              .then((data) => {
                  userData = data;
              });
        fetch(`https://api.github.com/users/${userName}/repos`)
        .then((res) => res.json())
        .then((data) => {
            userRepos = data;
        });
        if(userData && userRepos && Object.keys(userData).length !== 0 && Object.keys(userRepos).length !== 0) {
            return {user: userData, repos: userRepos}
        }
        else return {...previousState, ...userData};
    }
    let userData = null;
    let userRepos = null;
    if(userGitName.length !== 0) {

        fetch(`https://api.github.com/users/${userGitName}`)
                .then((res) => res.json())
                .then((data) => {
                    userData = data;
                });
        fetch(`https://api.github.com/users/${userGitName}/repos`)
        .then((res) => res.json())
        .then((data) => {
            userRepos = data;
        });
    }
    const [gitUser, updateUser] = React.useReducer(reducFunction, {
        user: userData ?? {},
        repos: userRepos ?? {},
    });
    return [gitUser, updateUser];
};


// const fetchUser = (user) => {
//     fetch(`https://api.github.com/users/${user}`)
//       .then((res) => res.json())
//       .then(setGitJson);
//   };

//   const getRepoData = (user) => {
//     fetch(`https://api.github.com/users/${user}/repos`)
//       .then((res) => res.json())
//       .then(setGitJson);
//   };

//   const getCommits = (user, repoName) => {
//     fetch(`https://api.github.com/repos/${user}/${repoName}/commits`)
//       .then((res) => res.json())
//       .then(setGitJson);
//   };

//   const getBranches = (user, repoName) => {
//     fetch(`https://api.github.com/repos/${user}/${repoName}/branches`)
//       .then((res) => res.json())
//       .then(setGitJson);
//   };