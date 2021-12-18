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
                url,
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
            "Content": "application/json",
            Authorization: `Bearer ${token}`,
        }
    };
}

const contributionsQuery = (username) => {
    return `{ user(login: "${username}") { repositoriesContributedTo(contributionTypes:` +
    ` [COMMIT, REPOSITORY], last: 100, includeUserRepositories: false) { pageInfo` +
    ` { startCursor endCursor hasPreviousPage } nodes { owner { login } name }}}}`;
}

export const fetchUser = async (username = user()) => {
    if(!username) return { error: "Error: User required."};
    const token = getToken();
    return await fetchGitHubData(`/users/${username}`, {validated: validate(token, username), token});
}

export const fetchUserRepos = async ( repoOwner = user()) => {
    if(!repoOwner) return { error: "Error: User required."};
    const token = getToken();
    let { success } = await fetchGitHubData(`/users/${repoOwner}/repos`, {validated: validate(token, repoOwner), token});
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
            const { data: { data: { user: { repositoriesContributedTo: { nodes: contributions }} } } } = await axios({
                url: "/graphql",
                ...headers(token, "POST"),
                data: {
                    query: contributionsQuery(username)
                }
            });

            return { success: { username, contributions } };
        } catch (err) {
            return { error: err.message };
        }
    } 
    return {error: "Access Denied: Login required."};
}

export const fetchRepoCommits = async (repoName, username = user()) => {
    if(!username) return { error: "Error: User required."};
    if(!repoName) return { error: "Error: Repository name required."};
    const token = getToken();
    return await fetchGitHubData(`/repos/${username}/${repoName}/commits`, {validated: validate(token, username), token});
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

export const fetchRepoCollaborators = async (repoName, repoOwner = user()) => {
    if(!repoOwner) return { error: "Error: User required."};
    if(!repoName) return { error: "Error: Repository name required."};
    const token = getToken();
    return await fetchGitHubData(`/repos/${repoOwner}/${repoName}/collaborators`, {validated: validate(token, repoOwner), token});
}

export const fetchRepoContributors = async (repoName, repoOwner = user()) => {
    if(!repoOwner) return { error: "Error: User required."};
    if(!repoName) return { error: "Error: Repository name required."};
    const token = getToken();
    // return await fetchGitHubData(`/repos/${repoOwner}/${repoName}/contributors`, {validated: validate(token, repoOwner), token});
    let { success, error } = await fetchGitHubData(`/repos/${repoOwner}/${repoName}/contributors`, {validated: validate(token, repoOwner), token});
    success = success.map(({login, contributions}) => ({login, contributions}));
    if(error) return { error };
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
    let half2 = sorted.slice(sorted.length/2, sorted.length);
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