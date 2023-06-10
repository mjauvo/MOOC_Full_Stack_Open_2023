import { useState } from 'react'

const Person = ({person}) => {
    return (
        <li>{person.name}</li>
    )
}

const Persons = ({persons}) => {
    return (
        <>
            <ul>
                {persons.map((person, key) =>
                    <Person key={key} person={person} />
                )}
            </ul>
        </>
    )
}

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
    const [newName, setNewName] = useState('')
    //console.log(persons)

    const handleNameChange = (event) => {
        //console.log(event.target.value)
        setNewName(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName
        }

        const nameList = persons.map(person => person.name)

        if (nameList.includes(newName)) {
            alert(`Name '${newName}' is already added to phonebook`)
        }
        else {
            setPersons(persons.concat(personObject))
        }

        setNewName("")
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit = {addPerson}>
                <div>
                    Name<br/><input value = {newName} onChange = {handleNameChange} />
                </div>
                <div>
                    <button type = "submit">ADD</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <Persons persons = {persons} />
        </div>
    )
}

export default App