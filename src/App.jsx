import React from "react";
import "./App.css";
import "./css/Background.css";
import "./css/styles.css";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main"

const App = () => {
  const [auth, setAuth] = React.useState(false);
  React.useEffect(() => {
    if((sessionStorage.getItem("gmv_api_tkn")||"").startsWith("gh") && sessionStorage.getItem("gmv_usr_inf")) {
      setAuth(true);
    } else setAuth(false);
  }, []);

  return (
    <div>
      {!auth && <Login onChange={setAuth}/>}
      {auth && <Main />}
    </div>
  );
};

export default App;
