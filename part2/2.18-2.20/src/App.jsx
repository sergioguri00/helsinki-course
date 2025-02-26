import { useEffect, useState } from "react"
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const Countries = ({ countries, handleClick }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (countries && typeof countries !== 'string' && !(countries.length > 1)) {
      console.log("holaquetal")
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${countries.latlng[0]}&lon=${countries.latlng[1]}&appid=${api_key}&units=metric`)
      .then(response => 
        setWeather({
          temperature: response.data.main.temp,
          wind: response.data.wind.speed,
          icon: response.data.weather[0].icon
        })
      )
    }
  },[countries])

  if (!countries) return null
  if (typeof countries === 'string') return <p>{countries}</p>
  if (countries.length > 1) {
    return (
      <div>
        {
          countries.map(country => {
            return (
              <div key={country.name.common}>
              <p>{country.name.common}
              <button onClick={handleClick}>Show</button>
              </p>
              </div>
            )
          })
        }
      </div>
    )
  }
  return (
    <div>
      {
        <>
        <h1>{countries.name.common}</h1>
        <p>Capital {countries.capital[0]}</p>
        <p>Area {countries.area}</p>
        <h2>Languages</h2>
        <ul>
          {
            Object.values(countries.languages).map(language => {
              return <li key={language}>{language}</li>
            })
          }
        </ul>
        <img src={countries.flags.png} alt={countries.name.common}/>
        { weather &&
        <>
        <h2>Weather in {countries.capital[0]}</h2>
        <p>Temperature {weather.temperature} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
        <p>Wind {weather.wind} m/s</p>
        </>
        }
        </>
      }
  </div>
  )
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState(null)
  const [allCountries, setAllCountries] = useState([])

  const handleClick = (event) => {
    setSearch(event.target.previousSibling.textContent)
  }

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setAllCountries(response.data)
    })
  },[])

  useEffect(() => {
    if (search) {
      const filteredCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
      if (filteredCountries.length > 10) setCountries('Too many matches, specify another filter')
      else if (filteredCountries.length === 1) {
        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filteredCountries[0].name.common}`)
        .then(response => {
          setCountries(response.data)
        })
      } else {
        setCountries(filteredCountries)
      }
    }
  },[search, allCountries])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
    <label>find countries </label>
    <input type="text" value={search} onChange={handleChange}/>
    <Countries countries={countries} handleClick={handleClick}/>
    </>
  )
}

export default App
