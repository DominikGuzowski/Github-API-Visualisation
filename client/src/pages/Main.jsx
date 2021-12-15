import React from 'react';
import "../css/MainPage.css"
import { LineChart } from "../components/LineChart";
export const Main = () => {
    React.useEffect(() => {

    }, []);
    return (
        <div className='main-page'>
            <div className='content-pane' style={{flexBasis:"50%"}}>
                <h3>Commits</h3>
                <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexBasis:"100%"}}>
                <LineChart dataKeys={['uv', 'pv', 'amt']}/></div>
            </div>
            <div className='content-pane'/>
            <div className='content-pane'/>
        </div>
    );
};