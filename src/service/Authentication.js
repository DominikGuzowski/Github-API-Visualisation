import { getAuth, signOut, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { githubProvider } from "../config/Provider";
import firebase from "../config/FirebaseConfig";


export const auth = getAuth(firebase);
export const authentication = async () => {
    return signInWithPopup(auth, githubProvider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        sessionStorage.setItem("gmv_api_tkn", token);
        sessionStorage.setItem("gmv_usr_inf", result._tokenResponse.screenName);
        //return {user, token};
        return true;
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GithubAuthProvider.credentialFromError(error);
        console.error(error);
        //return {errorCode, errorMessage, email, credential};
        return false;
      });
}
export const signout = async () => {
    signOut(auth).then(() => {
      sessionStorage.clear();
      window.location.reload();
    }).catch(console.error);
}
