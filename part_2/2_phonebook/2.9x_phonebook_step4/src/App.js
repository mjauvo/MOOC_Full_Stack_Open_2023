import { useState } from 'react'

const Title = ({title}) => {
    return (
        <h1>{title}</h1>
    )
}

const Header = ({header}) => {
    return (
        <h2>{header}</h2>
    )
}

const FilterForm = ({value, handleFilterChange}) => {
    return (
        <div>
            Filter shown with<br/><input value = {value} onChange = {handleFilterChange}/>
        </div>
    )
}

const PersonForm = ({handleAddPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <form onSubmit = {handleAddPerson}>
            <div>Name:<br/><input value = {newName} onChange = {handleNameChange}/></div>
            <div>Number:<br/><input value = {newNumber} onChange = {handleNumberChange}/></div>
            <div><button type = "submit">Add</button></div>
        </form>
    )
}

const Person = ({person}) => {
    return (
        <li>{person.name} ({person.number})</li>
    )
}

const Persons = ({filterValue, filteredPersons, persons}) => {
    if (filterValue === "") {
        return (
            <>
                <ul>
                    {persons.map((person, key) =>
                        <Person key = {key} person = {person} />
                    )}
                </ul>
            </>
        )
    }
    else {
        return (
            <>
                <ul>
                    {filteredPersons.map(person => (
                        <Person key = {person.id} person = {person} />
                    ))}
                </ul>
            </>
        )
    }
}

const App = () => {
    // For the purpose of filter testing
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
  
    //const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '+31-231-12314' }]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState("")
    //console.log(persons)
  
    const [filteredPersons, setFilteredPersons ] = useState([])
    const [filterValue, setFilterValue ] = useState("")

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