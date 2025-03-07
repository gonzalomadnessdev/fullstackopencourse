import { useState } from 'react'
import { useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  useEffect(() => {
    personsService.getAll().then(persons => {
      setPersons(persons)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const personFoundIdx = persons.findIndex(p => p.name == newName)
    const personFound = persons[personFoundIdx]
    if (personFound) {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const updatedPerson = {...personFound, number : newPhoneNumber}
        personsService.update(personFound.id, updatedPerson).then(()=>{
          setPersons(persons.map((p, idx)=> (idx == personFoundIdx) ? {...p, number: newPhoneNumber} : p))
        })
      }
      return;
    }
    personsService.create({ name: newName, number: newPhoneNumber }).then((person) => {
      console.log(person)
      setPersons([...persons, person])
      setNewName('')
      setNewPhoneNumber('')
    })
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id == id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService.remove(id).then(()=>{
        setPersons(persons.filter(p => p.id != id))
      })
    }
  }

  const handleFilter = (event) => {
    console.dir(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} value={filter} label={"filter shown with"} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        setNewName={setNewName}
        setNewPhoneNumber={setNewPhoneNumber}
      />
      <h2>Numbers</h2>
      <Persons handleDelete={handleDelete} persons={(filter.length === '') ? persons : persons.filter(p => p.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))} />
    </div>
  )
}

export default App
