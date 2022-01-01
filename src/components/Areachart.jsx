import React from 'react'
import { AreaChart, Area, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "../css/Tooltip.css"

  
export const Areachart = ({data, dataKeyOne, dataKeyTwo}) => {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <span className="label">{`${data[label].date}`}</span>
              <span style={{color:"#238636", fontWeight:"bold"}}>Additions: {payload[0].value}</span>
              <span style={{color:"#f02030", fontWeight:"bold"}}>Deletions: {payload[1].value}</span>
            </div>
          );
        }
       
        return null;
      };
    if(!data || data.length === 0) return <div>
        <h1 style={{color:"#aaa"}}>No data available</h1>
        <h6>Select a repo or if you already did consider a different one!</h6>
    </div>;
    return (
        <ResponsiveContainer width='95%' aspect={1.5}>
            <AreaChart width={730} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorAdd" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#238636" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#238636" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorDel" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f02030" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#f02030" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <YAxis fontWeight={400} fontSize='0.8em'/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip content={<CustomTooltip/>} />
                <Area type="monotone" dataKey={dataKeyOne} stroke="#238636" fillOpacity={1} fill="url(#colorAdd)" />
                <Area type="monotone" dataKey={dataKeyTwo} stroke="#f02030" fillOpacity={1} fill="url(#colorDel)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}
