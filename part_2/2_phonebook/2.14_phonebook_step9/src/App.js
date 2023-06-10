import { useState, useEffect } from 'react'
import personService from './services/persons'

import Title      from './components/Title'
import Header     from './components/Header'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons    from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState("")
    //console.log(persons)
  
    const [filteredPersons, setFilteredPersons ] = useState([])
    const [filterValue, setFilterValue ] = useState("")

    useEffect(() => {
        //console.log('effect')
        personService
            .getAllPersons()
            .then(initialPersons => {
                setPersons(initialPersons)
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

    const resetForm = () => {
        setNewName('');
        setNewNumber('');
    }

    const handleAddPerson = (event) => {
        event.preventDefault()

        // Either field is empty
        if (!newName || !newNumber) {
            alert("Name and number fields must both contain a value!");
        }
        // Both fields contain a value
        else {
            const newPersonObject = {
                name: newName,
                number: newNumber
            }
    
            const personExists = persons.find((p) => p.name === newName)
      
            if (personExists) {
                alert(`Name '${newName}' is already added to phonebook!`)
                resetForm()
            }
            else {
                personService
                    .createPerson(newPersonObject)
                        .then(returnedPerson => {
                            setPersons(persons.concat(returnedPerson))
                            resetForm()
                        })
            }
        }
    }

    const deletePerson = (id) => {
        const person = persons.find((p) => p.id === id);
        const deleteConfirmation = window.confirm(`Delete '${person.name}'?`);

        if (deleteConfirmation) {
            personService
                .deletePerson(id)
                    .then(() => {
                        const filteredPersons = persons.filter((person) => person.id !== id);
                        setPersons(filteredPersons);
                        setFilterValue("");
                    })
        }
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
                     persons = {persons}
                     deletePerson = {deletePerson} />
        </div>
    )
}

export default App