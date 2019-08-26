import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => (
  <div>
    {
      props.parts.map(part => <Part name={part.name} exercises={part.exercises} />)
    }
  </div>
)

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
)

const Total = (props) => (
  <p>Number of exercises {props.total} </p>
)

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 }
  ]
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={parts.reduce((prev, curr) => (prev + curr))} />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
