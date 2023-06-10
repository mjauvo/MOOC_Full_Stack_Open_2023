import { useEffect, useState } from "react"
import axios from "axios"

const Weather = ({capital}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState([])
    console.log('API key: ', api_key)

    const getCapitalWeather = () => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
            .then((response) => {
                setWeather(response.data)
            })
    }

    useEffect(getCapitalWeather, [capital, api_key])

    return (
        <>
        {weather.id ? (
            <div>
                <strong>Weather in {capital}</strong><br/>
                <span>Temperature: {weather.main.temp}&deg;C<br/></span>
                <span>Wind: {weather.wind.speed} m/s</span><br/>
                <img alt="weather" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            </div>
        ) : <div></div>}
        </>
    )
}

export default Weather