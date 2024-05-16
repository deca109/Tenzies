import React from "react";
import Die from "./Components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Result from "./Components/Results";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollNo, setRollNo] = React.useState(0);
  const [endTime, setEndTime] = React.useState(0);
  const [firstClick, setFirstClick] = React.useState(false);
  const [startTime, setStartTime] = React.useState(0);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [bestTime, setBestTime] = React.useState(
    JSON.parse(localStorage.getItem("bestTime")) || 0
  );

  React.useEffect(() => {
    if (bestTime === 0 || (timeElapsed !== 0 && timeElapsed < bestTime)) {
      localStorage.setItem("bestTime", JSON.stringify(timeElapsed));
      setBestTime(timeElapsed);
    }
    // eslint-disable-next-line
  }, [timeElapsed]);

  React.useEffect(() => {
    setTimeElapsed(Math.ceil((endTime - startTime) / 1000));
    //eslint-disable-next-line
  }, [endTime]);

  React.useEffect(() => {
    
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      setEndTime(performance.now());
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setRollNo((oldRollNo) => oldRollNo + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setRollNo(0);
      setFirstClick(false);
    }
  }

  function holdDice(id) {
    if (!firstClick) {
      setStartTime(performance.now());
      setFirstClick(true);
    }
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function deleteBestTime(){
    localStorage.removeItem("bestTime");
    setBestTime(0);
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="instructions-container">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls. <br></br>Win Time is calculated from first dice click.
        </p>
        <Result
          tenzies={tenzies}
          rollNo={rollNo}
          winTime={timeElapsed}
          bestTime={bestTime}
        />
      </div>
      <div className="dice-container">{diceElements}</div>
      <div className="button-container">
        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
        <button className="delete-best" onClick={deleteBestTime}>Delete Best Time</button>
      </div>
    </main>
  );
}
