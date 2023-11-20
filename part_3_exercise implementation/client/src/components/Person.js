const Person = ({person, deletePerson}) => {
    return (
        <tr>
            <td>{person.name}</td><td>({person.number})</td>
        </tr>
    )
}

export default Person