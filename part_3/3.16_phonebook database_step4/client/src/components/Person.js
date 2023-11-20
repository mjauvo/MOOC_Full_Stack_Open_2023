const Person = ({person, deletePerson}) => {
    return (
        <tr>
            <td key={person.id}>{person.name}</td><td>({person.number})</td><td><button onClick={() => deletePerson(person.id)}>Delete</button></td>
        </tr>
    )
}

export default Person