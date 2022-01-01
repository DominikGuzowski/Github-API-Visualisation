import React from 'react';
import "../css/ToggleSwitch.css";

export const ToggleGroup = ({group = [], onUpdate}) => {
    const [state, setState] = React.useState(new Array(group.length).fill(true));
    const onChange = (newState) => {
        onUpdate?.(newState);
        setState(newState);
    }
    const init = async () => {
        let arr = new Array(group.length).fill(true);
        setState(arr);
    }
    React.useEffect(() => {
        if(group.length > 0 && state.length !== group.length) {
            init();
        }
        //eslint-disable-next-line
    }, [group]);

    if(!group || group.length === 0) return null;
    if(state.length === 0) return null;
    return (
        <div className='toggle-group'>
            {group.map((l, i) => toggle(l, i, state, onChange))}
        </div>
    )
}


const toggle = (label,  index, states, update) => {
    return <div className={`toggle-wrapper`} key={"toggle_"+index}>
                <span>{label}</span>
                <div className={`toggle-switch ${(states[index])?"on":"off"}`} onClick={() => {
                    let temp = states.slice();
                    temp[index] = !temp[index];
                    update(temp);
                }}></div>
           </div>;
};