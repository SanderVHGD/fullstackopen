import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Persons = ({persons, handleDelete}) => {
  return (
    <div>
      {persons.map((person) => 
        <Person 
          key={person.id} 
          person={person}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}

const Person = ({person, handleDelete}) => {
  return (
    <div>
      {person.name} {person.number} 
      <button onClick={() => handleDelete(person)}>delete</button>
    </div>
  )
}

const Message = ({message}) => {
  if(message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}  

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ message, setMessage ] = useState(null)

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearch(event.target.value)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = event => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = { 
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          displayMessage(`Added ${returnedPerson.name}`)
        })
        .catch(error => {
          displayMessage(error.response.data)
        })
    }
  }

  const handleDelete = person => {
    if(window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(person.id)
        .then(() => {
          const newPersons = persons.filter(p => p.id !== person.id)
          setPersons(newPersons)
        })
    }
  }

  const personsToShow = persons.filter(
    person => person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 
  )

  const displayMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />

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

      <h2>Persons</h2>
      <Persons
        persons={personsToShow}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App