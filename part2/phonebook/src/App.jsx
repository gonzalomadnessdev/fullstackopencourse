import { useState } from 'react'
import { useEffect } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService.getAll().then(persons => {
      setPersons(persons)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    let succeed = false
    let successMessage = ''

    const personFoundIdx = persons.findIndex(p => p.name == newName)
    const personFound = persons[personFoundIdx]

    let action
    if (personFound) {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const updatedPerson = {...personFound, number : newPhoneNumber}
        action = personsService.update(personFound.id, updatedPerson).then(()=>{
          setPersons(persons.map((p, idx)=> (idx == personFoundIdx) ? {...p, number: newPhoneNumber} : p))
          succeed = true
          successMessage = `Updated ${newName}`
        }).catch((error)=>{
          setErrorMessage(`${JSON.stringify(error.response.data.error)}`)
          setTimeout(()=>{setErrorMessage(null)}, 5000)
        })
      }
    }else{
      action = personsService.create({ name: newName, number: newPhoneNumber }).then((person) => {
        console.log(person)
        setPersons([...persons, person])
        succeed = true
        successMessage = `Added ${newName}`
      }).catch((error)=>{
        setErrorMessage(`${JSON.stringify(error.response.data.error)}`)
        setTimeout(()=>{setErrorMessage(null)}, 5000)
      })
    }

    action.then(()=>{
      if(succeed){
        setNewName('')
        setNewPhoneNumber('')
        setSuccessMessage(successMessage)
        setTimeout(()=>{setSuccessMessage(null)}, 5000)
      }
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
      <Notification message={successMessage} type={'success'}/>
      <Notification message={errorMessage} type={'error'}/>
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
