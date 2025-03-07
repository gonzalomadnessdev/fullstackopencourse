import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const personsData = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]

  const [persons, setPersons] = useState(personsData)
  const [fileredPersons, setFilteredPersons] = useState(personsData)
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name == newName)) {
      alert(`${newName} is already added to the phonebook`)
      return;
    }
    const personObj = { id: persons.length + 1, name: newName, number: newPhoneNumber }
    setPersons([...persons, personObj])
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter collection={persons} property={"name"} setter={setFilteredPersons} label={"filter shown with"} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        setNewName={setNewName}
        setNewPhoneNumber={setNewPhoneNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={fileredPersons}/>
    </div>
  )
}

export default App
