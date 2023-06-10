const Country = ({country, handleShow}) => {
    return (
        <p>
            <strong>{country.name.common}</strong><br/>
            Capital: {country.capital}<br/>
            <button onClick={() => handleShow(country.name.common)}>Show</button>
        </p>
    )
}

export default Country