import React from "react"

export default function Die(props) {
    const dotPatterns = [
        [], 
        ['middle-dot'], 
        ['top-left', 'bottom-right'], 
        ['top-left', 'middle-dot', 'bottom-right'], 
        ['top-left', 'top-right', 'bottom-left', 'bottom-right'], 
        ['top-left', 'top-right', 'middle-dot', 'bottom-left', 'bottom-right'], 
        ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] 
    ];

    const renderDots = (value) => {
        return dotPatterns[value].map((dot, index) => (
            <span key={index} className={`dot ${dot}`}></span>
        ));
    };

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            {renderDots(props.value)}
        </div>
    )
}