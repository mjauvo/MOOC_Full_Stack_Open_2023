import Person from './Person'

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

export default Persons