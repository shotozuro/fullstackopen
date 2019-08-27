import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
        persons.map(person =>
          <p key={person.name}>
            {person.name} {person.phone}
          </p>)
      }
    </div>
  )
}

export default App
