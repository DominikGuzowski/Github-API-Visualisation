import { getAuth, signOut, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import firebase from "../config/FirebaseConfig";
const githubProvider = new GithubAuthProvider();

let auth = null;
try {
  auth = getAuth(firebase);
} catch(err) {
  console.error(err);
}

export default auth;
export const authentication = async () => {
    if(!auth) alert("GitHub login is not available.")
    else return signInWithPopup(auth, githubProvider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        sessionStorage.setItem("gmv_api_tkn", token);
        sessionStorage.setItem("gmv_usr_inf", result._tokenResponse.screenName);
        return true;
      }).catch((error) => {
        console.error(error);
        return false;
      });
}
export const signout = async () => {
    signOut(auth).then(() => {
      sessionStorage.clear();
      window.location.reload();
    }).catch(console.error);
}
