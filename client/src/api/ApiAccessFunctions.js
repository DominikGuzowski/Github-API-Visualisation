import axios from 'axios';

const user = () => {
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
    return await fetchGitHubData(`/users/${repoOwner}/repos`, {validated: validate(token, repoOwner), token});
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

export const fetchRepoContributers = async (repoName, repoOwner = user()) => {
    if(!repoOwner) return { error: "Error: User required."};
    if(!repoName) return { error: "Error: Repository name required."};
    const token = getToken();
    return await fetchGitHubData(`/repos/${repoOwner}/${repoName}/contributers`, {validated: validate(token, repoOwner), token});
}

export const fetchRepoLanguages = async (repoName, repoOwner = user()) => {
    if(!repoOwner) return { error: "Error: User required."};
    if(!repoName) return { error: "Error: Repository name required."};
    const token = getToken();
    return await fetchGitHubData(`/repos/${repoOwner}/${repoName}/languages`, {validated: validate(token, repoOwner), token});
}