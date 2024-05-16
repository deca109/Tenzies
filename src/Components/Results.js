import React from "react";

export default function Result(props){
    return(
        <div className="result-container">
            Number of Rolls - {props.rollNo}
            <br></br>
            <br></br>
            Win Time - {props.tenzies?props.winTime:0} seconds
            <br></br>
            <br></br>
            Best Win Time - {props.bestTime} seconds
        </div>
    );
}