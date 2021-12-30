import React from 'react';
import "../css/LanguageList.css";
export const LanguageList = ({languages, total}) => {
    const withSeparators = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    if(!languages || languages.length === 0) return <h1 style={{color:"#aaa"}}>No data available</h1>
    return (
        <ol className='language-list'>
            {languages?.map(({name, value, color}, i) => {
                return <li>
                    <div className="numbering" style={{color: i === 0 ? "gold" :
                                                              i === 1 ? "silver" :
                                                              i === 2 ? "#CD7F32" : "#50565d"}}>{i+1}.</div>
                    <div className="language" style={{color}}>{name}</div>
                    <div className="language-list-col">
                        <span>Size: <span style={{color: "#238636", fontWeight:"normal"}}>{withSeparators(value)} bytes</span></span>
                        <span>Share:  <span style={{color: "#1f6feb", fontWeight:"normal"}}>{(value / total * 100).toFixed(3)}%</span></span>
                    </div>
                </li>
            })}
        </ol>
    )
}
