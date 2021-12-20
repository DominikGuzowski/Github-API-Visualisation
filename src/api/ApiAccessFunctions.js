import axios from 'axios';

export const user = () => {
    return sessionStorage.getItem("gmv_usr_inf");
}

const getToken = () => {
    return sessionStorage.getItem("gmv_api_tkn");
}

const validate = (token = getToken(), username = user()) => {
    return (token || "").startsWith("gho_") && (username || "").length > 0;
}

const fetchGitHubData = async (url, {validated, token}) => {
    if(validated) {
        try {
            const {data} = await axios({
                url: `https://api.github.com${url}`,
                ...headers(token)
            });
            return {success: data};
        } catch(err) {
            return {error: err.message};
        }
    } else {
        try {
            const {data} = await axios({
                url,
            });
            return {success: data};
        } catch(err) {
            return {error: err.message};
        }
    }
}
const headers = (token, method = "GET") => {
    if(!token) return {};
    return {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
}

const contributionsQuery = (username) => {
    return `{ user(login: "${username}") { repositoriesContributedTo(contributionTypes:` +
    ` [COMMIT, REPOSITORY], last: 100, includeUserRepositories: false) { pageInfo` +
    ` { startCursor endCursor hasPreviousPage } nodes { owner { login } name }}}}`;
}

const introspectionQuery = (fieldName) => {
    return `{ __type(name: ${fieldName}) { name kind description fields { name } } }`;
}

export const fetchUser = async (username = user()) => {
    if(!username) return { error: "Error: User required."};
    const token = getToken();
    return await fetchGitHubData(`/users/${username}`, {validated: validate(token, username), token});
}

export const fetchUserRepos = async (repoOwner = user()) => {

    if(!repoOwner) return { error: "Error: User required."};
    const token = getToken();
    let { success, error } = await fetchGitHubData(`/users/${repoOwner}/repos?per_page=100`, {validated: validate(token, repoOwner), token});
    success = success.map(({name}) => name);
    return {success: {
        owner: repoOwner,
        repos: success}
    };
}

export const fetchUserContributions = async (username = user()) => {
    const token = getToken();
    if(validate(token, username)) {
        try {
           const { data: { data: { user: { repositoriesContributedTo: { nodes: contributions } } } } } = await axios({
                url: "https://api.github.com/graphql",
                ...headers(token, "POST"),
                data: {
                    query: contributionsQuery(username)
                }
            });
            
            // let resContributions = [];
            // for (const c of contributions) {
            //     let { success } = await fetchRepoContributors(c.name, c.owner.login);
            //     if(success?.data?.length > 1) {
            //         resContributions.push(c);
            //     }
            // }
            // console.log("FINISHED");
           return { success: { username, contributions } };
        } catch (err) {
            console.error(err)
            return { error: err.message };
        }
    } 
    return {error: "Access Denied: Login required."};
}

export const fetchRepoCommits = async (repoName, username = user()) => {
    let redo = 0;
    do {
        if(!username) return { error: "Error: User required."};
        if(!repoName) return { error: "Error: Repository name required."};
        const token = getToken();
        let {success, error } = await fetchGitHubData(`/repos/${username}/${repoName}/commits`, {validated: validate(token, username), token});
        if(error) return {error};
        try {
            success = success.map(({author, commit, committer}) => ({author, commit, committer})).reverse();
            return { success }
        } catch(err) {
            console.error(err);
            redo++;
        }
    } while(redo < 3);
    return { error: "Failed to fetch data."}
}

export const fetchStarred = async (username = user()) => {

    if(!username) return { error: "Error: User required."};
    const token = getToken();
    return await fetchGitHubData(`/users/${username}/starred`, {validated: validate(token, username), token});
}

export const fetchFollowers = async (username = user()) => {

    if(!username) return { error: "Error: User required."};
    const token = getToken();
    return await fetchGitHubData(`/users/${username}/followers`, {validated: validate(token, username), token});
}
export const fetchPagedFollowers = async (username = user(), page = 1) => {
    if(page < 1) return { error: "Page not found."};
    console.log(page)
    if(!username) return { error: "Error: User required."};
    const token = getToken();
    return await fetchGitHubData(`/users/${username}/followers?page=${page}`, {validated: validate(token, username), token});
}
export const fetchPagedFollowing = async (username = user(), page = 1) => {
    if(page < 1) return { error: "Page not found."};
    console.log(page)
    if(!username) return { error: "Error: User required."};
    const token = getToken();
    return await fetchGitHubData(`/users/${username}/following?page=${page}`, {validated: validate(token, username), token});
}

export const fetchFollowing = async (username = user()) => {

    if(!username) return { error: "Error: User required."};
    const token = getToken();
    return await fetchGitHubData(`/users/${username}/following`, {validated: validate(token, username), token});
}

export const fetchRepoBranches = async (repoName, repoOwner = user()) => {

    if(!repoOwner) return { error: "Error: User required."};
    if(!repoName) return { error: "Error: Repository name required."};
    const token = getToken();
    return await fetchGitHubData(`/repos/${repoOwner}/${repoName}/branches`, {validated: validate(token, repoOwner), token});
}

export const fetchRepoContributors = async (repoName, repoOwner = user()) => {

    if(!repoOwner) return { error: "Error: User required."};
    if(!repoName) return { error: "Error: Repository name required."};
    const token = getToken();
    // return await fetchGitHubData(`/repos/${repoOwner}/${repoName}/contributors`, {validated: validate(token, repoOwner), token});
    let { success, error } = await fetchGitHubData(`/repos/${repoOwner}/${repoName}/contributors`, {validated: validate(token, repoOwner), token});
    if(error) return { error };
    success = success.map(({login, contributions}) => ({ login, contributions}));
    if(success.length === 2) success.push({login: "", contributions: 0})
    return { success: { owner: repoOwner, repository: repoName, data: success }};
}


export const fetchRepoLanguages = async (repoName, repoOwner = user()) => {

    if(!repoOwner) return { error: "Error: User required."};
    if(!repoName) return { error: "Error: Repository name required."};
    const token = getToken();
    let {success, error} = await fetchGitHubData(`/repos/${repoOwner}/${repoName}/languages`, {validated: validate(token, repoOwner), token});
    if(error) return { error };
    success = Object.entries(success).map(([name, value]) => ({ name, value }));
    return { success };
}

export const fetchUserLanguages = async (username = user()) => {

    let { success: { repos }} = await fetchUserRepos(username);
    let languages = {};
    let total = 0;
    for(const repo of repos) {
        let {success} = await fetchRepoLanguages(repo, username);
        if(success)
        for(const language of success) {
            if(languages[language.name]) {
                languages[language.name] += language.value;
            } else {
                languages[language.name] = language.value;
            }
            total += language.value;
        }
    }
    let sorted = Object.entries(languages).sort(([,a], [,b]) => (a-b)).reverse().map(([name, value]) => ({name, value}));
    let half1 = sorted.slice(0, sorted.length/2);
    let half2 = sorted.slice(sorted.length/2, sorted.length).reverse();
    let res = [];
    while(half1.length > 0 || half2.length > 0) {
        let a = half1.shift();
        let b = half2.shift();
        if(a) res.push(a);
        if(b) res.push(b);
    }
    languages = Object.entries(languages).map(([name, value]) => ({name, value}));
    return {languages: res, total};
}

export const fetchRepoStatsCodeFrequency = async (repo, owner = user()) => {
    const token = getToken();

    let redo = 0;
    do {
        let { success, error } = await fetchGitHubData(`/repos/${owner}/${repo}/stats/code_frequency`, {validated: validate(token, owner), token});
        try {
            
            success = success?.map(([date, additions, deletions]) => {
                let sDate = new Date(date * 1000);
                let eDate = new Date(sDate.getFullYear(), sDate.getMonth(), sDate.getDate() + 6);
                let dateStr = `${sDate.getDate()}/${sDate.getMonth() + 1}/${sDate.getFullYear()} - ${eDate.getDate()}/${eDate.getMonth() + 1}/${eDate.getFullYear()}`
                return { date: dateStr, additions, deletions: -deletions}
            });
            let i = success.length - 1;
            while(i >= 0 && success[i].additions === 0 && success[i].deletions === 0) {
                i--;
            }
        
            if(i + 2 < success.length && i !== -1) {
                success = success.splice(0, i + 3);
            }
        
            return { success: {data: success, repo}, error };
        } catch(err) {
            console.error(err);
            redo++;
        }
    } while(redo < 3);
    return { error: "Error fetching data."}
}

export const fetchRepoStatsCommits = async (repo, owner = user()) => {
    const token = getToken();
    let { success } = await fetchGitHubData(`/repos/${owner}/${repo}/stats/commit_activity`, {validated: validate(token, owner), token});
    let dayOfWeek = [
        {
            name: "Mon",
            value: 0
        },
        {
            name: "Tue",
            value: 0
        },
        {
            name: "Wed",
            value: 0
        },
        {
            name: "Thu",
            value: 0
        },
        {
            name: "Fri",
            value: 0
        },
        {
            name: "Sat",
            value: 0
        },
        {
            name: "Sun",
            value: 0
        },
    ];
    for (const {days} of success) {
        dayOfWeek[0].value += days[1];
        dayOfWeek[1].value += days[2];
        dayOfWeek[2].value += days[3];
        dayOfWeek[3].value += days[4];
        dayOfWeek[4].value += days[5];
        dayOfWeek[5].value += days[6];
        dayOfWeek[6].value += days[0];
    }
    return { success: { dayOfWeek, repo } }
}
export const fetchRepoStatsContributors = async (repo, owner = user()) => {
    const token = getToken();
    let { success } = await fetchGitHubData(`/repos/${owner}/${repo}/stats/contributors`, {validated: validate(token, owner), token});
    let dayOfWeek = [0, 0, 0, 0, 0, 0, 0];
    // for (const {days} of success) {
    //     dayOfWeek[0] += days[1];
    //     dayOfWeek[1] += days[2];
    //     dayOfWeek[2] += days[3];
    //     dayOfWeek[3] += days[4];
    //     dayOfWeek[4] += days[5];
    //     dayOfWeek[5] += days[6];
    //     dayOfWeek[6] += days[0];
    // }
    return { success: dayOfWeek }
}
