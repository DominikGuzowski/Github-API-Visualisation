import React from 'react';
import './App.css';

const App = () => {
  const [gitJson, setGitJson] = React.useState("");
  const [user, setUser] = React.useState("");

  const fetchUser = () => {
    fetch(`https://api.github.com/users/${user}`)
    .then(res => res.json())
    .then(setGitJson);
  };

  const getRepoData = () => {
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(res => res.json())
    .then(setGitJson);
  }

  return (
    <div>
      <input type="text" 
             value={user}
             onChange={(e) => setUser(e.target.value)} 
             placeholder="Github Username"
      />
      <button onClick={() => fetchUser()}>Get User</button>
      <button onClick={() => getRepoData()}>Get Repos</button>
    
      <pre>
        {JSON.stringify(gitJson, null, 2)}
      </pre>
    </div>
  );
}

export default App;
