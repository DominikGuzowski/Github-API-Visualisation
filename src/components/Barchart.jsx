import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell} from 'recharts';
import "../css/Tooltip.css";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF49A9', '#FF2042', '#20CC48', '#AA80FF', '#FFEE10'];

export const Barchart = ({dataSet, dataKey, xAxis}) => {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <span className="label" style={{textAlign:"center"}}>{`${label}`}</span>
              <span style={{color:"#000", fontWeight:"normal"}}>Commits: {payload[0].value}</span>
            </div>
          );
        }
      
        return null;
      };
    if(!dataSet || dataSet.length === 0) return <h1 style={{color:"#aaa"}}>No data available</h1>;
    return (
        <ResponsiveContainer width="99%" aspect={1.5}>
            <BarChart
            width={500}
            height={300}
            data={dataSet}
            barSize={25}
            fontWeight={400}
            fontSize='0.8em'
            >
            <XAxis dataKey={xAxis} scale="point" padding={{ left: 10, right: 10 }} />
            <YAxis />
            <Tooltip content={<CustomTooltip/>}/>
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey={dataKey} background={{ fill: '#eee2' }}>
            {dataSet.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}>{entry.name}</Cell>
                ))}
            </Bar>
            </BarChart>
      </ResponsiveContainer>
    )
}
