import React from 'react';
import { Radar, RadarChart as RadarGraph, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export const RadarChart = ({dataSet, polarAxis, radarName, dataKey, onUserSelect, currentUser, customColor}) => {
    const CustomTooltip = ({ payload }) => {
        if (payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <span className="label" style={{textAlign:"center"}}>{`${payload[0].payload.login}`}</span>
              <span style={{color:customColor||"#238636", fontWeight:"bold"}}>Contributions: {payload[0].value}</span>

            </div>
          );
        }
        
        return null;
      };
    const customLabel = ({ payload, x, y, textAnchor, stroke, radius }) => {
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
                            {payload.value !== currentUser.login ? <a style={{fill:"white", fontWeight:"normal"}} href={`https://github.com/${payload.value}`} 
                            rel="noreferrer" target="_blank" onClick={(e) => {
                                e.preventDefault();
                                onUserSelect?.(payload.value);
                            }}>{payload.value}</a> : <tspan fill={customColor||"#2ea043"} fontWeight="normal">{payload.value}</tspan>}
                    </tspan>
                </text>
        </g>);
    }

    if(!dataSet || dataSet.length === 0)  return (
        <h1 style={{color:"#aaa"}}>No data available</h1>
    )
    return (
        <ResponsiveContainer width={'95%'} aspect={1.6}>
            <RadarGraph outerRadius="80%" data={dataSet}>
                <PolarGrid />
                <PolarAngleAxis tick={customLabel} dataKey={polarAxis} fontWeight={400} />
                <PolarRadiusAxis angle={90 - (360/dataSet.length)} fontWeight={400} />
                <Tooltip content={<CustomTooltip />}/>
                <Radar name={radarName} dataKey={dataKey} stroke={customColor||"#238636"} fill={customColor||"#238636"} fillOpacity={0.3} />
            </RadarGraph>
        </ResponsiveContainer>
    );
};