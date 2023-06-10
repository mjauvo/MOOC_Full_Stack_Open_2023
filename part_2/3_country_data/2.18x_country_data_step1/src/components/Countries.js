import Country from './Country'
import SelectedCountry from './SelectedCountry'

const Countries = ({filterValue, filteredCountries}) => {
    if (filterValue !== "") {
        if (filteredCountries.length > 10) {
            return (
                <>
                    <p>Found too many ({filteredCountries.length}) matches! Please, be more specific.</p>
                </>
            )
        }
        else if (filteredCountries.length < 11 && filteredCountries.length > 1) {
            return (
                <>
                    {filteredCountries.map(country => (
                        <Country key = {country.ccn3} country = {country}/>
                    ))}
                </>
            )
        }
        else if (filteredCountries.length === 1) {
            return (
                <>
                    {filteredCountries.map(country => (
                        <SelectedCountry key = {country.ccn3} country = {country} />
                    ))}
                </>
            )
        }
    }
}

export default Countries