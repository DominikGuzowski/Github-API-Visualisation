import React from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip} from 'recharts';
import "../css/Tooltip.css";

const COLORS = ['#238636', '#c2c3c5'];
const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
  const radius = outerRadius * 0.95;// * 1.35;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
  const left = midAngle >= 90 && midAngle <= 270;
  const angle = left ? 180 - midAngle : -midAngle;
  const displayName = name.length > 14 ? name.substring(0, 12) + "..." : name;
  return (
    <text style={{pointerEvents:"none"}} transform={`translate(${x},${y}) rotate(${angle})`} fill={index % 2 === 0 ? "white" : "black"} 
    textAnchor={!left ? "end" : "start"} dominantBaseline="central" fontSize="0.9rem">
        {displayName}
    </text>
  );
};
export const SunburstChart = ({dataSet, dataKey, username, onClick}) => {
    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            <span className="label" style={{textAlign:"center"}}>{`${payload[0].name}`}</span>
          </div>
        );
      }
      
      return null;
    };

    const customLabel = (entry) => {
      return `${entry.name}`;
    }

    if(!dataSet || dataSet.length === 0) return <h1 style={{color:"#aaa"}}>No data available</h1>;
    return (
    <ResponsiveContainer width="95%" aspect={1.5}>
    <PieChart>
        {/* <text x='50%' y='50%' textAnchor="middle" fontSize={12} dominantBaseline="middle" fill="white">
            {username}
        </text> */}
        <Pie
            stroke='#0d1117'
            strokeWidth={5}
            data={dataSet}
            cx="50%"
            cy="50%"
            label={renderCustomizedLabel}
            outerRadius={'100%'}
            dataKey={dataKey}
            labelLine={false}
            paddingAngle={dataSet.length === 1 ? 0 : 0}
            // innerRadius={'20%'}
            isAnimationActive={false}
            fontWeight={400}
        >
            {dataSet?.map((entry, index) => (
                <Cell onClick={() => {
                  onClick?.(entry.name)
                }} key={`cell-${index}`} className="hover-zis" fill={COLORS[index % COLORS.length]}>{entry.name}</Cell>
            ))}
        </Pie>
        <Tooltip content={<CustomTooltip />}/>
        </PieChart>
    </ResponsiveContainer>
    )
}
