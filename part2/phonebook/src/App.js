import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, onChange}) => {
  return (
    <div>
      Filter shown with 
      <input 
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const Form = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
  }) => {
    return (
      <form onSubmit={addPerson}>
        <div>
          <div>
            name: 
            <input 
              value={newName}
              onChange={handleNameChange}
            />
          </div>
          <div>
            number: 
            <input 
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map((person) => 
        <Person 
          key={person.id} 
          name={person.name} 
          number={person.number}
        />
      )}
    </div>
  )
}

const Person = ({name, number}) => <div>{name} {number}</div>

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearch(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const person = { 
        name: newName,
        number: newNumber,
        id: persons.length+1
      }

      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = persons.filter(
    person => person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={search}
        onChange={handleSearchChange}
      />
      
      <h2>Add a new person</h2>
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
      />
    </div>
  )
}

export default App