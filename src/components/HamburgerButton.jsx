import React from 'react';
import "../css/HamburgerButton.css";

export const HamburgerButton = ({onClick, toggled}) => {
    const squishToggle = () => {
        if(squished === "squished") {
            toggleSquish("");
        } else {
            toggleSquish("squished");
        }
    }

    React.useEffect(() => {
        onClick?.(squished === "squished");
        toggleSquish("");
        // eslint-disable-next-line
    }, [toggled]);

    React.useEffect(() => {
        onClick?.(false);
        // eslint-disable-next-line
    }, []);
    const [squished, toggleSquish] = React.useState("squished");
    return (
        <div className="button-wrapper" onClick={() => {
            onClick?.(squished !== "squished");
            squishToggle();
        }}>
            <button className={squished} id='hamburger'>
            </button>
        </div>
    )
}
