import { getAuth, signOut, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { githubProvider } from "../config/Provider";
import firebase from "../config/FirebaseConfig";


const auth = getAuth(firebase);

export const authentication = async () => {
    return signInWithPopup(auth, githubProvider)
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      sessionStorage.setItem("gmv_api_tkn", token);
      sessionStorage.setItem("gmv_usr_inf", JSON.stringify(user));
      return {user, token};
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GithubAuthProvider.credentialFromError(error);
      return {errorCode, errorMessage, email, credential};
    });
}
export const signout = async () => {
    signOut(auth)
    .then(() => {
      console.log("signed out successfully");
    }).catch((error) => {
      console.error(error);
    });
}
