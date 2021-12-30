import React from 'react';
import { MainTitle } from "../components/MainTitle";
import { GitLoginButton } from "../components/GitLoginButton";
import "../css/styles.css";
import "../css/LoginInput.css";
import { fetchUserWithToken } from '../api/ApiAccessFunctions';
export const Login = ({onChange}) => {
    const [login, setLogin] = React.useState("");
    const [token, setToken] = React.useState("");

    return (
        <div className='main'>
            <div className='login-form'>
                <div className="login-header">
                    <MainTitle title="GitHub Metric Visualiser"/>
                </div>
                <GitLoginButton onClick={onChange}/>
                <span style={{marginTop:"-0.5rem", fontSize:"0.75rem", color:"#464f58"}}>(Desktop Only)</span>
                <div className="login-section">
                    <h3>OR</h3>
                    <input onChange={(e) => {
                        setLogin(e.target.value);
                    }} className="login-input" placeholder="Enter your GitHub login (case sensitive)"></input>
                    <input onChange={(e) => {
                        setToken(e.target.value);
                    }} className="login-input" placeholder="Enter your GitHub API Access Token"></input>
                    <button onClick={() => {
                        fetchUserWithToken(login, token).then(({success, error}) => {
                            if(success) {
                                sessionStorage.setItem("currentUser", success.login);
                                sessionStorage.setItem("gmv_usr_inf", success.login);
                                sessionStorage.setItem("gmv_api_tkn", token);
                                window.location.reload();
                            } else {
                                if(error === 404) {
                                    alert("User with the login '" + login + "' was not found.")
                                } else if(error === 401) {
                                    alert("API token provided is invalid.")
                                } else {
                                    alert("Error occurred: " + error)
                                }
                            }
                        })
                    }} className="github-login-button">Login with Token</button>
                </div>
            </div>
            <div className="bg-circle c-size-10 circle-clr-red" style={{bottom: "-5%", left:"-5%"}}/>
            <div className="bg-circle c-size-25 circle-clr-blue" style={{top: "-10%", right:"-10%"}}/>
            <div className="bg-circle c-size-15 circle-clr-magenta" style={{top: "15%", left:"5%"}}/>
            <div className="bg-circle c-size-20 circle-clr-green" style={{top: "30%", left:"25%"}}/>
            <div className="bg-circle c-size-5 circle-clr-purple" style={{right: "20%", bottom:"5%"}}/>
            <div className="bg-circle c-size-5 circle-clr-orange" style={{top: "25%", left:"50%"}}/>
            <div className="bg-circle c-size-10 circle-clr-yellow" style={{top: "50%", left:"70%"}}/>
        </div>
    );
};