import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [fileredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/persons').then((res)=>{
      console.log(res)
      if(res.status === 200){
        const persons = res.data
        setPersons(persons)
        setFilteredPersons(persons)
      }
    })

  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name == newName)) {
      alert(`${newName} is already added to the phonebook`)
      return;
    }
    const personObj = { id: persons.length + 1, name: newName, number: newPhoneNumber }
    setPersons([...persons, personObj])
    setNewName('')
    setNewPhoneNumber('')
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
