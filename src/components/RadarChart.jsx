import React from 'react';
import { Radar, RadarChart as RadarGraph, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Text } from 'recharts';
import { GitLink } from './GitLink';

export const RadarChart = ({dataSet, polarAxis, radarName, dataKey, onUserSelect, currentUser}) => {
    console.log(dataSet)
    const customLabel = ({ payload, x, y, textAnchor, stroke, radius, index }) => {
        return (
            <g className="recharts-layer recharts-polar-angle-axis-tick">
                <text
                radius={radius}
                stroke={stroke}
                x={x}
                y={y}
                className="recharts-text recharts-polar-angle-axis-tick-value"
                text-anchor={textAnchor}
                >
                    <tspan x={x} dy="0em">
                            <a style={{fill:"white", fontWeight:"normal"}} href={`https://github.com/${payload.value}`} 
                            rel="noreferrer" target="_blank" onClick={(e) => {
                                e.preventDefault();
                                if(payload.value !== currentUser) onUserSelect?.(payload.value);
                            }}>{payload.value}</a>
                    </tspan>
                </text>
        </g>);
    }

    if(!dataSet)  return (
        <h1 style={{color:"#aaa"}}>No data available</h1>
    )
    return (
        <ResponsiveContainer width={'99%'} aspect={1.6}>
            <RadarGraph outerRadius="80%" data={dataSet}>
                <PolarGrid />
                <PolarAngleAxis tick={customLabel} dataKey={polarAxis} fontWeight={400} fontSize={'calc(0.5vw + 0.5em)'} stroke='#fff'/>
                <PolarRadiusAxis angle={90 - (360/dataSet.length)} fontWeight={400} />
                <Tooltip separator=': '/>
                <Radar name={radarName} dataKey={dataKey} stroke="#238636" fill="#238636" fillOpacity={0.3} />
            </RadarGraph>
        </ResponsiveContainer>
    );
};