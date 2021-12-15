import React from "react";
import "./App.css";
import { fetchRepoCommits, fetchUser, fetchUserContributions, fetchUserRepos} from "./api/ApiAccessFunctions";
import "./css/Background.css";
import "./css/styles.css";
import { Background } from "./components/Background";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main"
const App = () => {
  const [gitData, setGitData] = React.useState("");
  const [auth, setAuth] = React.useState(false);
  React.useEffect(() => {
    if(sessionStorage.getItem("gmv_api_tkn") && sessionStorage.getItem("gmv_usr_inf")) {
      setAuth(true);
      console.log("authenticated")
    }
    // return signout();
  }, []);
  const fUserContrs = () => {
    fetchUserContributions().then(({success, error}) => setGitData(success??error));
  }
  return (
    <div className="main">
      <Background/>
      {!auth && <Login onChange={setAuth}/>}
      {auth && <Main />}
    </div>
  );
};

export default App;
