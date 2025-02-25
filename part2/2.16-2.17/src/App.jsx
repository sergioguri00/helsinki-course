import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
      personService.getAll()
      .then(response => setPersons(response))
  },[])

  const handleChangeName = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = {...person, number: newNumber}
        personService.update(person.id, changedPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== response.id ? person : response))
          setTimeout(() => {
            setErrorMessage(null)
          }
          , 2000)
          setErrorMessage(
            `Updated ${newName}`
          )
        })
        .catch(error => {
          setTimeout(() => {
            setErrorMessage(null)
          }
          , 2000)
          setErrorMessage(
            `Information of ${newName} has already been removed from server`
          )
          setPersons(persons.filter(person => person.id !== changedPerson.id))
        }
        )
        setNewName('')
        setNewNumber('')
      }
      return
    }
    personService.create({name: newName, number: newNumber})
    .then(response => setPersons(persons.concat(response)))
    setTimeout(() => {
      setErrorMessage(null)
    }
    , 2000)
    setErrorMessage(
      `Added ${newName}`
    )
    setNewName('')
    setNewNumber('')
  }

  const handleChangeFilter = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setPersons(filteredPersons)
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(id)
      .then(() => setPersons(persons.filter(person => person.id !== id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={filter} handleChangeFilter={handleChangeFilter}/>
      
      <h2>Add a new</h2>
      
      <Form newName={newName} handleChangeName={handleChangeName} newNumber={newNumber} handleChangeNumber={handleChangeNumber} handleClick={handleClick}/>
      
      <h2>Numbers</h2>
      
      <Persons persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App