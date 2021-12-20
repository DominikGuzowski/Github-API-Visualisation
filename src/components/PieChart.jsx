import React from 'react';
import { PieChart as PieGraph, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import "../css/piechart.css"
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF49A9', '#FF2042', '#AA80FF', '#20CC48', '#FFEE10'];

export const PieChart = ({dataSet: data, valueKey, total}) => {
    const [dataSet, setData] = React.useState([]);

    React.useEffect(() => {
        setData(data);
    }, [data]);
    const [activeIndex, setActiveIndex] = React.useState(null);
    const onMouseEnter = React.useCallback((data, index) => {
      setActiveIndex(index);
    }, []);
    const onMouseLeave = React.useCallback((data, index) => {
      setActiveIndex(null);
    }, []);
    const hoverSector = (props) => {
        const {
            cx,
            cy,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill
          } = props;
        return (
            <Sector
              style={{transition:"opacity 200ms linear"}}
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={startAngle}
              endAngle={endAngle}
              opacity={0.8}
              fill={fill}
            />
          );
    }
    const CustomTooltip = ({ active, payload}) => {
        if (active && payload && payload.length) {
          return (
              <div style={{width:"fit-content", backgroundColor:"#fffa", borderRadius:"1em", padding:"0.015em 1em"}}>
                  <p className="label" style={{color:"black", fontWeight:"500"}}>{payload[0].name}</p>
              </div>
          );
        }
        return null;
    };

    const labelPercent = (entry) => {
        let percent = (total?(entry.value/total*100):0);
        percent = percent < 0.1 ? 0.1 : percent;
        return `${entry.name}: ${total? percent.toFixed(1) + "%":""}`;
    }
    if(!dataSet || dataSet.length === 0)  return (
        <h1 style={{color:"#aaa"}}>No data available</h1>
    )
    return <ResponsiveContainer width="99%" aspect={1.5}>
        <PieGraph>
        <Pie
            stroke='none'
            data={dataSet}
            cx="50%"
            cy="50%"
            label={labelPercent}
            outerRadius={'60%'}
            fill="#8884d8"
            dataKey={valueKey}
            activeShape={hoverSector}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            activeIndex={activeIndex}
            isAnimationActive={false}
            fontWeight={400}
        >
            {dataSet.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}>{entry.name}</Cell>
            ))}
        </Pie>
        {/* <Legend fontWeight={400}/> */}
        <Tooltip content={<CustomTooltip />}/>
        </PieGraph>
    </ResponsiveContainer>
};