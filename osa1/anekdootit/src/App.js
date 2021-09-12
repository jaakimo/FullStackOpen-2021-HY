import React, { useState } from "react";

export const Anecdote = ({ header, content }) => {
  return (
    <div>
      <h1>{header}</h1>
      <p>{content}</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(
    Math.floor(Math.random() * anecdotes.length)
  );
  let imax = points.reduce(
    (imax, b, idx, arr) => (b > arr[imax] ? idx : imax),
    0
  );
  if (points[imax] === 0) {
    return (
      <div>
        <Anecdote
          header={"Anecdote of the day"}
          content={anecdotes[selected]}
        />
        <button
          onClick={() => {
            const copy = [...points];
            copy[selected] += 1;
            setPoints(copy);
          }}
        >
          vote
        </button>
        <button
          onClick={() => {
            setSelected(Math.floor(Math.random() * anecdotes.length));
          }}
        >
          next anecdote
        </button>
      </div>
    );
  }
  return (
    <div>
      <Anecdote header={"Anecdote of the day"} content={anecdotes[selected]} />
      <button
        onClick={() => {
          const copy = [...points];
          copy[selected] += 1;
          setPoints(copy);
        }}
      >
        vote
      </button>
      <button
        onClick={() => {
          setSelected(Math.floor(Math.random() * anecdotes.length));
        }}
      >
        next anecdote
      </button>
      <Anecdote header={"Anecdote with most votes"} content={anecdotes[imax]} />
      <p>has {points[imax]} votes</p>
    </div>
  );
};

export default App;
