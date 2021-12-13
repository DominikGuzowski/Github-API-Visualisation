
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWtZhAEZoP5fk-sPL0s9LeE1l_WceO2Po",
  authDomain: "github-metric-visualisation.firebaseapp.com",
  projectId: "github-metric-visualisation",
  storageBucket: "github-metric-visualisation.appspot.com",
  messagingSenderId: "564403980472",
  appId: "1:564403980472:web:c0b579f6d78d56dfde0c4d",
  measurementId: "G-TWV2VCM3BN"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
export default firebase;