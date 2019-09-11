import React, { useState, useEffect } from 'react'
import personServices from './personServices'
import './App.css'

const Filter = ({ query, onChange }) => {
  return (
    <div>
      filter shown with: <input value={query} onChange={onChange} />
    </div>
  )
}

const PersonForm = props => {
  const {
    newName,
    newPhone,
    onNewNameChange,
    onNewPhoneChange,
    onSubmit,
  } = props
  return (
    <form onSubmit={onSubmit}>
      <div className='form'>
        <label htmlFor='name'>name:</label>
        <input id='name' value={newName} onChange={onNewNameChange} />
        <label htmlFor='number'>number:</label>
        <input id='number' value={newPhone} onChange={onNewPhoneChange} />
        <button id='submit' type='submit'>
          add
        </button>
      </div>
    </form>
  )
}

const Persons = ({ persons, query, onRemove }) => {
  return (
    <table>
      <tbody>
        {persons
          .filter(person =>
            person.name.toLowerCase().includes(query.toLowerCase())
          )
          .map(person => (
            <Person key={person.name} person={person} onRemove={onRemove} />
          ))}
      </tbody>
    </table>
  )
}

const Person = ({ person, onRemove }) => {
  const handleRemovePerson = person => {
    const toBeDeleted = window.confirm(`Delete ${person.name}?`)
    if (toBeDeleted) onRemove(person)
  }
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button onClick={() => handleRemovePerson(person)}>Delete</button>
      </td>
    </tr>
  )
}

const Notif = ({ type, content }) => {
  const messageType = () => {
    switch (type) {
      case 'add':
        return 'success'
      case 'update':
        return 'info'
      case 'remove':
        return 'delete'
      case 'error':
        return 'error'
      default:
        return ''
    }
  }

  return <p className={`notification ${messageType()}`}>{content}</p>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newNameFilter, setNewNameFilter] = useState('')
  const [message, setMessage] = useState(null)

  const setNotification = message => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const newPerson = { name: newName, number: newPhone }
    const selectedPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )
    if (selectedPerson !== undefined) {
      const toBeUpdated = window.confirm(
        `Replace ${newName}'s old number with a new one?`
      )
      if (toBeUpdated) updatePerson(selectedPerson.id, newPerson)
    } else {
      addPerson(newPerson)
    }

    setNewName('')
    setNewPhone('')
  }

  const addPerson = newPerson => {
    personServices
      .add(newPerson)
      .then(response => {
        setPersons([...persons, response])
        setNotification({ type: 'add', content: `Added ${newPerson.name}` })
      })
      .catch(error => {
        console.log(error)

        setNotification({
          type: 'error',
          content: `Failed to add ${newPerson.name}`,
        })
      })
  }

  const updatePerson = (personId, newPerson) => {
    const personIndex = persons.findIndex(person => person.id === personId)
    personServices
      .update(personId, newPerson)
      .then(updatedPerson => {
        const updatedList = [
          ...persons.slice(0, personIndex),
          updatedPerson,
          ...persons.slice(personIndex + 1),
        ]
        setPersons(updatedList)
        setNotification({
          type: 'update',
          content: `Updated ${newPerson.name}${"'"}s phone number`,
        })
      })
      .catch(() => {
        setNotification({
          type: 'error',
          content: `Failed to update ${newPerson.name}${"'"}s phone number`,
        })
      })
  }

  const handleNewNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNewPhoneChange = event => {
    setNewPhone(event.target.value)
  }

  const handleNewFilterChange = event => {
    setNewNameFilter(event.target.value)
  }

  const handleRemovePerson = person => {
    const personId = person.id
    personServices
      .remove(personId)
      .then(() => {
        const newPersonList = persons.filter(person => person.id !== personId)
        setPersons(newPersonList)
        setNotification({ type: 'remove', content: `Deleted ${person.name}` })
      })
      .catch(() => {
        setNotification({
          type: 'error',
          content: `Information of ${person.name} has already been removed from server`,
        })
      })
  }

  useEffect(() => {
    personServices.getAll().then(response => setPersons(response))
  }, [])

  return (
    <div className={'App'}>
      <h2>Phonebook</h2>
      {message && <Notif {...message} />}
      <Filter query={newNameFilter} onChange={handleNewFilterChange} />

      <h3>Add New</h3>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        onNewNameChange={handleNewNameChange}
        onNewPhoneChange={handleNewPhoneChange}
        onSubmit={handleSubmit}
      />

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
