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
    }, [toggled]);

    React.useEffect(() => {
        onClick?.(false);
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
