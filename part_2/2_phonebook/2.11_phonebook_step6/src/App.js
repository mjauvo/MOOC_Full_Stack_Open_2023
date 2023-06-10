import { useState, useEffect } from 'react'
import axios from 'axios'

import Title from './components/Title'
import Header from './components/Header'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState("")
    //console.log(persons)
  
    const [filteredPersons, setFilteredPersons ] = useState([])
    const [filterValue, setFilterValue ] = useState("")

    useEffect(() => {
        //console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                //console.log('promise fulfilled')
                setPersons(response.data)
                //console.log('Response data:', response.data)
        })
    }, [])
    console.log('render', persons.length, 'persons')

    const handleNameChange = (event) => {
        //console.log(event.target.value)
        let nameValue = event.target.value
        setNewName(nameValue)
    }

    const handleNumberChange = (event) => {
        //console.log(event.target.value)
        let numberValue = event.target.value
        setNewNumber(numberValue)
    }
  
    const handleFilterChange = (event) => {
        //console.log(event.target.value)
        let filterValue = event.target.value
        setFilterValue(filterValue)
  
        let filteredValues = persons.filter((person) =>
            person.name.toLowerCase().includes(filterValue.toLowerCase())
        )
        setFilteredPersons(filteredValues)
    }

    const handleAddPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }

        const nameList = persons.map(person => person.name)

        if (nameList.includes(newName)) {
            alert(`Name '${newName}' is already added to phonebook`)
        }
        else {
            setPersons(persons.concat(personObject))
        }

        setNewName("")
        setNewNumber("")
    }

    return (
        <div>
            <Title title = "Phonebook" />
            <FilterForm value = {filterValue} handleFilterChange = {handleFilterChange}/>
            <Header header = "Add new contact"/>
            <PersonForm handleAddPerson = {handleAddPerson}
                       newName = {newName}
                       handleNameChange = {handleNameChange}
                       newNumber = {newNumber}
                       handleNumberChange = {handleNumberChange} />
            <Header header = "Contacts" />
            <Persons filterValue = {filterValue}
                     filteredPersons = {filteredPersons}
                     persons = {persons} />
        </div>
    )
}

export default App