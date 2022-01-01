import React from 'react';
import "../css/Aside.css";

export const Aside = ({children, isLoading, visible, setVisible}) => {
    const [visibility, setVisibility] = React.useState(true);
    React.useEffect(() => {
        const windowWidth = document.querySelector(".main-wrapper");
        const obs = new ResizeObserver((entries) => {
            const a = entries[0].contentRect.width;
            setVisibility(a < 1150);
        });
        obs.observe(windowWidth);

        return (() => { obs.unobserve(windowWidth) })
    }, []);

    return (
        <div className={`aside ${visibility && visible && "visible"}`} onClick={() => {
            if(visibility) setVisible?.();
        }}>
            <span className={`aside-title${isLoading ? " loading" : ""}`}>Public Repositories</span>
            <div className='aside-list'>
                {children}
            </div>
        </div>
    )
}
