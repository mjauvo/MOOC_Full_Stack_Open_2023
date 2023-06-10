const Country = ({country}) => {
    return (
        <p>
            <strong>{country.name.common}</strong><br/>
            Capital: {country.capital}<br/>
        </p>
    )
}

export default Country