import React, { useState } from 'react'

const Button = ({clickHandler, text}) => {
  return (
    <button onClick={clickHandler}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, amount}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{amount}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if(good===0 && neutral===0 && bad===0) {
    return (
      <div>No feedback given</div>
    )
  }

  const average = () => ((good-bad) / (good+neutral+bad)).toFixed(2)
  const positive = () => ((good*100) / (good+neutral+bad)).toFixed(2) + " %"

  return (
    <table>
      <tbody>
        <StatisticLine text="good" amount={good} />
        <StatisticLine text="neutral" amount={neutral} />
        <StatisticLine text="bad" amount={bad} />
        <StatisticLine text="average" amount={average()} />
        <StatisticLine text="positive" amount={positive()} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button clickHandler={() => setGood(good + 1)} text="good" />
      <Button clickHandler={() => setNeutral(neutral + 1)} text="neutral" />
      <Button clickHandler={() => setBad(bad + 1)} text="bad" />

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App