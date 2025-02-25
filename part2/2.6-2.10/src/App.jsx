import { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPersons = persons.concat({ name: newName, number: newNumber})
    setPersons(newPersons)
    setNewName('')
    setNewNumber('')
  }

  const handleChangeFilter = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setPersons(filteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleChangeFilter={handleChangeFilter}/>
      
      <h2>Add a new</h2>
      
      <Form newName={newName} handleChangeName={handleChangeName} newNumber={newNumber} handleChangeNumber={handleChangeNumber} handleClick={handleClick}/>
      
      <h2>Numbers</h2>
      
      <Persons persons={persons}/>
    </div>
  )
}

export default App