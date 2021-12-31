import React from 'react';
import { LineChart as LineGraph, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "../css/Tooltip.css";
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload) {
    return (
      <div className="custom-tooltip">
        <span className="label" style={{textAlign:"center"}}>{`${payload[0].payload.name}`}</span>
        <div style={{display:"flex", flexDirection:"column", gap: "0.25rem", padding:"0.25rem", 
                     backgroundColor:"#161b22", borderRadius:"0.25rem", border:"1px solid #30363d"}}>
          {payload.map(x => <span key={x.name} style={{color:x.color, fontWeight:"bold"}}>{x.name}: <span style={{color:"#f0f6fc", fontWeight:"normal"}}>{x.value}</span></span>)} 
        </div>
      </div>
    );
  }

  return null;
};
export const LineChart = ({dataSet, dataKeys, xAxisKey, yAxisKey}) => {
    const colorPalette = [
        "#C486FF",
        "#7EB9FF",
        "#5BCF67",
        "#FFAD6F",
        "#FF768F",
        "#AC92EB",
        "#4FC1E8",
        "#A0D568",
        "#FFCE54",
        "#BD3544"
    ]
    
    if(dataSet && dataSet.length > 0) { 
        return (
          <div style={{color:"black", width:"100%"}}>
            <ResponsiveContainer width={'95%'} aspect={1.5}>
              <LineGraph
                data={dataSet}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} fontSize={'75%'} fontWeight={400} />
              <YAxis dataKey={yAxisKey} fontSize={'75%'} fontWeight={400} />
              <Tooltip separator=': ' content={<CustomTooltip /> }/>
              {/* <Legend /> */}
              {dataKeys?.map((key, i) => <Line type="monotone" dataKey={key} strokeWidth={1.5} stroke={`hsl(${(59*i) % 256}, 55%, 50%)`/*colorPalette[i%colorPalette.length]*/} dot={false} />)}
              </LineGraph>
          </ResponsiveContainer>
        </div>
        );
    } else return (
        <h1 style={{color:"#aaa"}}>No data available</h1>
    )
};