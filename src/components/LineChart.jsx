import React from 'react';
import { LineChart as LineGraph, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
              <Tooltip separator=': '/>
              {/* <Legend /> */}
              {dataKeys?.map((key, i) => <Line type="monotone" dataKey={key} strokeWidth={1.25} stroke={colorPalette[i%colorPalette.length]} dot={false} />)}
              </LineGraph>
          </ResponsiveContainer>
        </div>
        );
    } else return (
        <h1 style={{color:"#aaa"}}>No data available</h1>
    )
};