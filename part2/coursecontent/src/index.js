import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course.name}</h1>
)

const Content = (props) => (
  <div>
    {
      props.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
    }
  </div>
)

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
)

const Total = ({ parts }) => {
  const total = parts.map(part => part.exercises).reduce((prev, curr) => prev + curr)
  return <p><strong>Total of {total} exercises</strong></p>
}

const Course = (props) => {
  const { course } = props
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
