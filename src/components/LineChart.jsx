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
        "#ED5564"
    ]
    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
    if(dataSet) { 
        return (
            <ResponsiveContainer width={'99%'} aspect={2}>
            <LineGraph
            width={500}
            height={300}
            data={dataSet}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} fontSize={'75%'} fontWeight={500}/>
            <YAxis dataKey={yAxisKey} fontSize={'75%'} fontWeight={500}/>
            <Tooltip />
            <Legend />
            {dataKeys?.map((key, i) => <Line type="monotone" dataKey={key} strokeWidth={2.5} stroke={colorPalette[i%colorPalette.length]} />)}
            </LineGraph>
        </ResponsiveContainer>
        );
    } else return (
        <h1 style={{color:"#aaa"}}>No data available</h1>
    )
};