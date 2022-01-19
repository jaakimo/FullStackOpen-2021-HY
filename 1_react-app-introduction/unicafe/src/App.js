import React, { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>no feedback given</p>;
  }
  return (
    <div>
      <table>
        <StatisticsLine text={"good"} value={good} />
        <StatisticsLine text={"neutral"} value={neutral} />
        <StatisticsLine text={"bad"} value={bad} />
        <StatisticsLine text={"all"} value={good + neutral + bad} />
        <StatisticsLine
          text={"average"}
          value={((good - bad) / (good + neutral + bad)).toFixed(1)}
        />
        <StatisticsLine
          text={"positive"}
          value={((good / (good + neutral + bad)) * 100).toFixed(1) + " %"}
        />
      </table>
    </div>
  );
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodHandler = () => {
    setGood(good + 1);
  };
  const neutralHandler = () => setNeutral(neutral + 1);
  const badHandler = () => setBad(bad + 1);

  return (
    <div>
      <Header text={"give feedback"} />
      <Button text={"Good"} onClick={goodHandler} />
      <Button text={"neutral"} onClick={neutralHandler} />
      <Button text={"bad"} onClick={badHandler} />
      <Header text={"Statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};
export default App;
