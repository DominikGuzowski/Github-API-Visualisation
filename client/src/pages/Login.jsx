import React from 'react';
import { MainTitle } from "../components/MainTitle";
import { GitLoginButton } from "../components/GitLoginButton";
import "../css/styles.css";

export const Login = ({onChange}) => {
    
    return (
        <div className='main'>
            <MainTitle title="GitHub Metric Visualiser"/>
            <GitLoginButton onClick={onChange}/>
        </div>
    );
};