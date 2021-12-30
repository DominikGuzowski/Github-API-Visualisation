import React from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip} from 'recharts';
import "../css/Tooltip.css";

const COLORS = ['#238636', '#c2c3c5'];

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
        <text x='50%' y='50%' textAnchor="middle" fontSize={12} dominantBaseline="middle" fill="white">
            {username}
        </text>
        <Pie
            stroke='#0000'
            data={dataSet}
            cx="50%"
            cy="50%"
            label={customLabel}
            outerRadius={'70%'}
            dataKey={dataKey}
            paddingAngle={dataSet.length === 1 ? 0 : 5}
            innerRadius={'40%'}
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
