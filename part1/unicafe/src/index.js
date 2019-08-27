import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)
const Statistics = (props) => {
  const { stats } = props
  const total = stats.map(stat => stat.value).reduce((prev, curr) => prev + curr)
  const totalScore = stats
    .map(stat =>
      stat.text === "good"
      ? stat.value * 1
      : stat.text === "neutral"
        ? stat.value * 0
        : stat.value * -1)
    .reduce((prev, curr) => prev + curr)
  const average = totalScore > 0 ? totalScore / total : 0
  const good = stats.find(stat => stat.text === "good").value
  const positive = good > 0 ? good / total : 0 
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
      {
        props.stats.map(stat => (
          <Statistic key={stat.text} text={stat.text} value={stat.value} />
        ))
      }
      <tr>
        <td>all</td>
        <td>{total}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{average}</td>
      </tr>
      <tr>
        <td>positive</td>
        <td>{positive * 100 + ' %'}</td>
      </tr>
      </tbody>
      </table>
  </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const stats = [
    {text: "good", value: good},
    {text: "neutral", value: neutral},
    {text: "bad", value: bad},
  ]
  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <button onClick={() => setGood(good + 1)}>Good</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
      </div>
      <Statistics stats={stats} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)