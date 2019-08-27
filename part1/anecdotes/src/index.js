import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [score, setScore] = useState(Array(props.anecdotes.length).fill(0))
  const nextAnectode = () => {
    const random = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(random)
  }
  const voteAnectode = () => {
    const copy = [
      ...score.slice(0,selected),
      score[selected] + 1,
      ...score.slice(selected+1)]
    setScore(copy)
  }
  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>{score[selected]}</p>
      <button onClick={() => voteAnectode()}>Vote</button>
      <button onClick={() => nextAnectode()}>Next anecdote</button>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)