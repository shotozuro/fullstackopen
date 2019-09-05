import React, { useState, useEffect } from 'react'
import personServices from './personServices'

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

const Persons = ({ persons, query, onRemove }) => {
  return <table>
    <tbody>
      {
        persons
          .filter(person => person.name.toLowerCase().includes(query.toLowerCase()))
          .map(person => <Person key={person.name} person={person} onRemove={onRemove} />)
      }
    </tbody>
  </table>
}

const Person = ({ person, onRemove }) => {
  const handleRemovePerson = (person) => {
    const toBeDeleted = window.confirm(`Delete ${person.name}?`)
    if (toBeDeleted) onRemove(person.id)
  }
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={() => handleRemovePerson(person)}>Delete</button></td>
    </tr>
  )
}
const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ newNameFilter, setNewNameFilter ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newNameIndex = persons.findIndex(person => person.name === newName)
    if (newNameIndex > -1) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name: newName, number: newPhone }

      personServices.add(newPerson).then(response => setPersons([...persons, response]))

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

  const handleRemovePerson = (personId) => {
    personServices.remove(personId)
      .then(() => {
        const newPersonList = persons.filter(person => person.id !== personId)
        setPersons(newPersonList)
      })
  }

  useEffect(() => {
    personServices.getAll().then(response => setPersons(response))
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
      <Persons
        persons={persons}
        query={newNameFilter}
        onRemove={handleRemovePerson}
      />
    </div>
  )
}

export default App
