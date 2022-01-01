import React from 'react';
import "../css/RangeSlider.css";
export const RangeSlider = ({min, max, gap, onUpdate, labels, showLabels}) => {

    const [minVal, setMin] = React.useState(min);
    const [maxVal, setMax] = React.useState(max);
    const handleUpdate = (e) => {
        const progressBar = document.querySelector(".range-slider .range-progress");
        const rangeInput = document.querySelectorAll(".range-input input");
        const minSlider = rangeInput[0];
        const maxSlider = rangeInput[1];
        let minValue = parseInt(minSlider.value);
        let maxValue = parseInt(maxSlider.value);

        if(maxValue - minValue < gap) {

            if(e.target.className === "range-min") {
                minValue = minSlider.value = maxValue - gap;
            } else {
                maxValue = maxSlider.value = minValue + gap;
            }
        }
        progressBar.style.left = ((minValue / minSlider.max) * 100) + "%";
        progressBar.style.right = (100 - ((maxValue / minSlider.max) * 100)) + "%";
        

        onUpdate?.([minValue, maxValue]);   
        setMin(minValue);
        setMax(maxValue);
    };

    React.useEffect(() => {
        const rangeInput = document.querySelectorAll(".range-input input");
        rangeInput[0].value = min;
        rangeInput[1].value = max;
        //eslint-disable-next-line
    }, []);


    return (
        <div className="range-wrapper">
            { showLabels && <div className="range-label">{labels && max + 1 === labels.length && min === 0 ? labels[minVal] : minVal}</div>}
            <div className="slider-wrapper">
                <div className='range-slider'>
                    <div className='range-progress'/>
                </div>
                <div className="range-input">
                    <input type="range" className='range-min' min={min} max={max} 
                        onChange={handleUpdate} name="minSlider" />
                </div>
                <div className="range-input">
                    <input type="range" className='range-max' min={min} max={max} 
                        onChange={handleUpdate} name="maxSlider" />
                </div>
            </div>
            {showLabels && <div className="range-label">{labels && max + 1 === labels.length && min === 0 ? labels[maxVal] : maxVal}</div>}
        </div>
    )
}
