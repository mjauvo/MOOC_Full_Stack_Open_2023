import Header from './Header'
import Weather from './Weather'

const SelectedCountry = ({country}) => {
    return (
        <div>
            <Header header = {country.name.common} />
            <div>
                <p><strong>Capital:</strong><br/>{country.capital}</p>
                <p><strong>Population:</strong><br/>{country.population}</p>
                <p><strong>Area:</strong><br/>{country.area}</p>
            </div>
            <p>
                <strong>Languages</strong><br/>
                {Object.values(country.languages).map((language) => (
                    <span key={language}>{language}<br/></span>
                ))}
            </p>
            <img alt="flag" src={country.flags.png} width="30%" border="1" />
            <p>
            <Weather capital = {country.capital} />
            </p>
        </div>
    )
}

export default SelectedCountry