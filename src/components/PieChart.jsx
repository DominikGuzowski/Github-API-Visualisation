import React from 'react';
import { PieChart as PieGraph, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import "../css/piechart.css";
import "../css/Tooltip.css";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF49A9', '#FF2042', '#AA80FF', '#20CC48', '#FFEE10'];

export const PieChart = ({dataSet: data, valueKey, total}) => {
    const [dataSet, setData] = React.useState([]);

    React.useEffect(() => {
        if(data) {
            let half1 = data.slice(0, data.length/2);
            let half2 = data.slice(data.length/2, data.length).reverse();
            let res = [];
            while(half1.length > 0 || half2.length > 0) {
                let a = half1.shift();
                let b = half2.shift();
                if(a) res.push(a);
                if(b) res.push(b);
                let temp = half1;
                half1 = half2;
                half2 = temp;
            }
            setData(res);
        }
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
              <div className='custom-tooltip'>
                  <span className="label">{payload[0].name}</span>
                  <span><b>Size: </b>{payload[0].value} bytes</span>
                  <span><b>Share: </b>{(payload[0].value / total * 100).toFixed(3)}%</span>
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
    return <ResponsiveContainer width="95%" aspect={1}>
        <PieGraph>
        <Pie
            stroke='none'
            data={dataSet}
            cx="50%"
            cy="50%"
            // label={labelPercent}
            outerRadius={'90%'}
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
                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]}>{entry.name}</Cell>
            ))}
        </Pie>
        <Legend fontWeight={400}/>
        <Tooltip content={<CustomTooltip />}/>
        </PieGraph>
    </ResponsiveContainer>
};