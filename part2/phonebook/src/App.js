import React, { useState } from 'react'

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

  return (
    <div>
      <h1>Phonebook</h1>
      <div>filter shown with: <input value={newNameFilter} onChange={handleNewFilterChange} /></div>
      <h2>Add New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handleNewPhoneChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        newNameFilter.length > 0
          ? persons
            .filter(person => person.name.includes(newNameFilter))
            .map(person =>
              <p key={person.name}>
                {person.name} {person.phone}
              </p>)
          : persons.map(person =>
            <p key={person.name}>
              {person.name} {person.phone}
            </p>)
      }
    </div>
  )
}

export default App
