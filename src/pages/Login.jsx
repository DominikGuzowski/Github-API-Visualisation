import React from 'react';
import { MainTitle } from "../components/MainTitle";
import { GitLoginButton } from "../components/GitLoginButton";
import "../css/styles.css";

export const Login = ({onChange}) => {
    
    return (
        <div className='main'>
            <div style={{display: "flex", justifyContent:"center", flexFlow:"column", alignItems:"center"}}>
                <MainTitle title="GitHub Metric Visualiser"/>
                <GitLoginButton onClick={onChange}/>
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