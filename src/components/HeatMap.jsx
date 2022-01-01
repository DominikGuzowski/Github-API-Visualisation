import React from 'react'
import "../css/HeatMap.css";

const colorMap = {
    '#ebedf0': 'rgb(22, 27, 34)',
    '#9be9a8': 'rgb(14, 68, 41)',
    '#40c463': 'rgb(0, 109, 50)',
    '#30a14e': 'rgb(38, 166, 65)',
    '#216e39': 'rgb(57, 211, 83)'
};

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];
export const HeatMap = ({contributions }) => {
    const createCells = () => {
        const weeks = [];
        let key = 0;
        let mon = "";

        weeks.push(<div className='heatmap-week days' key="week-names">
            <div className='heatmap-day head'>{" "}</div>
            <div className='heatmap-day weekday'>{" "}</div>
            <div className='heatmap-day weekday'>Mon</div>
            <div className='heatmap-day weekday'>{" "}</div>
            <div className='heatmap-day weekday'>Wed</div>
            <div className='heatmap-day weekday'>{" "}</div>
            <div className='heatmap-day weekday'>Fri</div>
            <div className='heatmap-day weekday'>{" "}</div>
        </div>);
        for(const week of contributions) {
            let text = " ";
            let date = new Date(week.firstDay);

            if((months[date.getMonth()] !== mon && mon !== "") || (key === 0 && date.getMonth() === 0 && date.getDate() === 1)) {
                text = months[date.getMonth()];
                mon = text;
            } else if(mon === "") {
                mon = months[date.getMonth()];
            }
            weeks.push(<div className='heatmap-week' key={`week_${key++}`}>
                {<div className='heatmap-day head' >{text}</div>}
                {week.contributionDays[0].weekday > 0 && emptyDay(week.contributionDays[0].weekday).map(x => x)}
                {week.contributionDays.map(x => {
                    const contrLabel = x.contributionCount === 0 ? "No contributions" : 
                    `${x.contributionCount} contribution${x.contributionCount === 1 ? "" : "s"}`;
                    const date = new Date(x.date);
                    const label = `${contrLabel} on ${months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()}`;
                    return <div className='heatmap-day' 
                        key={x.date} 
                        aria-label={label} 
                        style={{backgroundColor: colorMap[x.color]}}
                    />})}
            </div>);
        }
        return <div className='heatmap'>{weeks.map(x => x)}</div>

    }

    const emptyDay = (upTo) => {
        let arr = [];
        for(let i = 0; i < upTo; i++) {
            arr.push(<div key={`empty_${i}`} className='heatmap-day no-hover'/>)
        }
        return arr;
    }

    if(!contributions || contributions.length === 0) return null;
    return (
        <div className='heatmap-wrapper'>
            {createCells()}
            <div className='heatmap-legend'>
                <div className='heatmap-day no-hover'>Less</div>
                {Object.values(colorMap).map((x, i) => <div key={i} className='heatmap-day no-hover' style={{backgroundColor:x}}/>)}
                <div className='heatmap-day no-hover'>More</div>
            </div>
        </div>
    )
}
