import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ query, onChange }) => {
  return (
    <div>filter shown with: <input value={query} onChange={onChange} /></div>
  )
}

const PersonForm = (props) => {
  const { newName, newPhone, onNewNameChange, onNewPhoneChange, onSubmit } = props
  return (
    <form onSubmit={onSubmit}>
      <div>
      name: <input value={newName} onChange={onNewNameChange} />
      </div>
      <div>
      number: <input value={newPhone} onChange={onNewPhoneChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, query }) => {
  return persons
    .filter(person => person.name.toLowerCase().includes(query.toLowerCase()))
    .map(person => <Person key={person.name} person={person} />)
}

const Person = ({ person }) => {
  return (
    <p>{person.name} {person.phone}</p>
  )
}
const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ newNameFilter, setNewNameFilter ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newNameIndex = persons.findIndex(person => person.name === newName)
    if (newNameIndex > -1) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons, { name: newName, phone: newPhone }])
      setNewName('')
      setNewPhone('')
    }
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleNewFilterChange = (event) => {
    setNewNameFilter(event.target.value)
  }

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={newNameFilter} onChange={handleNewFilterChange} />

      <h3>Add New</h3>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        onNewNameChange={handleNewNameChange}
        onNewPhoneChange={handleNewPhoneChange}
        onSubmit={handleSubmit} />

      <h3>Numbers</h3>
      <Persons persons={persons} query={newNameFilter} />
    </div>
  )
}

export default App
