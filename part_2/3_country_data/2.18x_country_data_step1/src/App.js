import { useState, useEffect } from 'react'
import axios from 'axios'
import Title from './components/Title'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
    const [allCountries, setAllCountries] = useState([])
    const [filterValue, setFilterValue ] = useState('')

    const getAllCountries = () => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setAllCountries(response.data)
            })
    }

    useEffect(getAllCountries, [])

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value)
    }

    const filteredCountries = allCountries.filter((country) => {
        return country.name.common.toLowerCase().includes(filterValue.toLowerCase())
    })

    return (
        <div>
            <Title title = "Country data" />
            <Filter filterValue = {filterValue}
                    handleFilterChange = {handleFilterChange} />
            <Countries filterValue={filterValue} filteredCountries={filteredCountries} />
        </div>
    )
}

export default App
