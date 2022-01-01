import axios from 'axios';

export const user = () => {
    return sessionStorage.getItem("gmv_usr_inf");
}

const getToken = () => {
    return sessionStorage.getItem("gmv_api_tkn");
}

const validate = (token = getToken(), username = user()) => {
    return (token || "").startsWith("gh") && (username || "").length > 0;
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

export const fetchUserWithToken = async (username, token) => {
    if(!username || !token) throw new Error("Full details not provided.");
    const data = await fetchGitHubData(`/users/${username}`, {validated: true, token});
    if(data.error) {
        return { error: data.error.split(" ").pop()};
    }
    else return { success: data.success };
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
    if(error) return { error };
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
    return await fetchGitHubData(`/users/${username}/followers?per_page=20`, {validated: validate(token, username), token});
}
export const fetchPagedFollowers = async (username = user(), page = 1) => {
    if(page < 1) return { error: "Page not found."};
    if(!username) return { error: "Error: User required."};
    const token = getToken();
    return await fetchGitHubData(`/users/${username}/followers?per_page=20&page=${page}`, {validated: validate(token, username), token});
}
export const fetchPagedFollowing = async (username = user(), page = 1) => {
    if(page < 1) return { error: "Page not found."};
    if(!username) return { error: "Error: User required."};
    const token = getToken();
    return await fetchGitHubData(`/users/${username}/following?per_page=20&page=${page}`, {validated: validate(token, username), token});
}

export const fetchFollowing = async (username = user()) => {

    if(!username) return { error: "Error: User required."};
    const token = getToken();
    return await fetchGitHubData(`/users/${username}/following?per_page=20`, {validated: validate(token, username), token});
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

export const fetchYearContributions = async (username = user()) => {
    const {data: {data: {user: {contributionsCollection: {contributionCalendar}}}}} = await axios({
        url: "https://api.github.com/graphql",
        ...headers(getToken(), "POST"),
        data: {
            query: `query {
                user(login: "${username}") {
                  contributionsCollection {
                    contributionCalendar {
                      colors
                      totalContributions
                      weeks {
                        contributionDays {
                          color
                          contributionCount
                          date
                          weekday
                        }
                        firstDay
                      }
                    }
                  }
                }
              }`
        }
    })
    return contributionCalendar;
}
export const fetchYearContributionsFrom = async (username = user(), year = new Date().getFullYear()) => {
    const {data: {data: {user: {contributionsCollection: {contributionCalendar}}}}} = await axios({
        url: "https://api.github.com/graphql",
        ...headers(getToken(), "POST"),
        data: {
            query: `query {
                user(login: "${username}") {
                  contributionsCollection(from: "${new Date(year, 0, 1).toISOString()}") {
                    contributionCalendar {
                      totalContributions
                      weeks {
                        contributionDays {
                          color
                          contributionCount
                          date
                          weekday
                        }
                        firstDay
                      }
                    }
                  }
                }
              }`
        }
    })

    return contributionCalendar;
}


// export const fetchPagedUserRepos = async (username = user()) => {
//     const data = await fetchGitHubData(`/repos/${username}/`)
// }

export const fetchUserLanguagesGQL = async (username = user()) => {
    let languageColors = {};
    const flattenLanguages = (data) => {
        return data.repos.map(({languages: {edges}}) => edges).flat().map(({size, node: {name, color}}) => ({name, size, color}));
    }
    const updateLanguages = (languages, colors, data) => {
        for(const d of data) {
            if(languages[d.name]) 
            {
                languages[d.name] += d.size;
            }
            else {
                languages[d.name] = d.size;
                colors[d.name] = d.color;
            }
            languages.totalSize += d.size;
        }
    }
    const extractInfo = (result) => {
        let data = {};
        if(result.user) data = {
                            repos: result.user.repositories.nodes,
                            pageInfo: result.user.repositories.pageInfo
                        };
        else data = {
            repos: result.organization.repositories.nodes,
            pageInfo: result.organization.repositories.pageInfo
        };
        return data;
    }
    const {data: {data: res}} = await axios({
        url:"https://api.github.com/graphql",
        ...headers(getToken(), "POST"),
        data: {
            query: userLanguages(username)
        }
    })
    let data = extractInfo(res);
    let languages = {
        totalSize: 0
    }
    updateLanguages(languages, languageColors, flattenLanguages(data));
    while(data.pageInfo.hasNextPage) {
        const {data: {data: result}} = await axios({
            url:"https://api.github.com/graphql",
            ...headers(getToken(), "POST"),
            data: {
                query: userLanguagesPaged(username, data.pageInfo.endCursor)
            }
        });
        data = extractInfo(result);
        updateLanguages(languages, languageColors, flattenLanguages(data));
    }
    let total = 0 + languages.totalSize;
    delete languages.totalSize;
    let finalLanguages = Object.entries(languages).sort(([,a], [,b]) => (a-b)).map(([name, value]) => ({name, value})).reverse();
    for(let i = 0; i < finalLanguages.length; i++) {
        finalLanguages[i].color = languageColors[finalLanguages[i].name]
    }
    return {success: {languages: finalLanguages, total}};
}

export const fetchPagedRepos = async (username = user(), page) => {
    if(page < 1) throw new Error("Min page value is 1.");
    let { success } = await fetchGitHubData(`/users/${username}/repos?per_page=100&page=${page}`, 
    {validated: validate(getToken(), username), token: getToken()});
    success = success.map(({name}) => name);
    return {
        success: {
            owner: username,
            repos: success
        }
    };
}

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
]

export const fetchContributionTimeline = async (username = user(), creationDate) => {
    if(!creationDate) return { error: "Account creation date not provided."}
    const flattenContributions = (contributions) => {
        let flattened = [];
        for(const week of contributions.weeks) {
            for(const { contributionCount: count, date } of week.contributionDays) {
                flattened.push({ count, date });
            }
        }
        return flattened;
    }
    const currentYear = new Date().getFullYear();
    const creationYear = new Date(creationDate).getFullYear();
    let data = [];
    let keys = [];
    for(let year = creationYear; year <= currentYear; year++) {
        keys.push(year);
        const response = await fetchYearContributionsFrom(username, year); 
        data.push({year, data: flattenContributions(response)});
    }
    const normalize = (dataSet) => {
        let result = {};
        for(const year of dataSet) {
            for(const day of year.data) {
                const date = new Date(day.date);
                const dayMonth = date.getDate() + " " + months[date.getMonth()];
                if(!result[dayMonth]) result[dayMonth] = {};
                result[dayMonth][year.year] = day.count;
            }
        }
        result = Object.keys(result).map((key) => ({name: key, ...result[key]}));
        while(result[0].name !== "1 Jan") {
            result.unshift(result.pop());
        }
        let feb29 = null;
        let i = 0;
        for(; i < result.length && result[i].name !== "29 Feb"; i++);
        if(i < result.length) {
            feb29 = result.splice(i, 1)[0];
            result.splice(59, 0, feb29);
        }
        return result;
    }
    data = normalize(data);
    return { data, dataKeys: keys };
}   
const userLanguages = (username) => {
    return `{
        user(login: "${username}") {
          repositories(first: 100, ownerAffiliations: [OWNER]) {
            pageInfo {
              endCursor
              hasNextPage
            }
            nodes {
              languages(first: 100) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
              }
            }
          }
        }
        organization(login: "${username}") {
            repositories(first: 100, ownerAffiliations: [OWNER]) {
              pageInfo {
                endCursor
                hasNextPage
              }
              nodes {
                languages(first: 100) {
                  edges {
                    size
                    node {
                      color
                      name
                    }
                  }
                }
              }
            }
          }
      }`
}
const userLanguagesPaged = (username, after) => {
    return `{
        user(login: "${username}") {
          repositories(first: 100, after: "${after}", ownerAffiliations: [OWNER]) {
            pageInfo {
              endCursor
              hasNextPage
            }
            nodes {
              languages(first: 100) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
              }
            }
          }
        }
        organization(login: "${username}") {
            repositories(first: 100, after: "${after}", ownerAffiliations: [OWNER]) {
              pageInfo {
                endCursor
                hasNextPage
              }
              nodes {
                languages(first: 100) {
                  edges {
                    size
                    node {
                      color
                      name
                    }
                  }
                }
              }
            }
          }
      }`
}
