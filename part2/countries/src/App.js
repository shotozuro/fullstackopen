import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const SearchForm = (props) => (
  <div>
    find countries: <input onChange={props.onChange} value={props.value} />
  </div>
)

const SearchResult = (props) => {
  const totalCountriesFound = props.countries.length
  return totalCountriesFound > 10
    ? <p>Too many matches, specify another filter</p>
    : totalCountriesFound === 1
      ? <CountryDetail country={props.countries[0]} />
      : <Countries countries={props.countries} />
}

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let didCancel = false
    const YOUR_API_KEY = `9c43cbaa35e5450a9fd140918192808`

    async function fetchWeather () {
      const response = await axios.get(`https://api.apixu.com/v1/current.json?key=${YOUR_API_KEY}&q=${country.name}`)
      const result = await response.data.current
      if (!didCancel) setWeather(result)
      setLoading(false)
    }

    fetchWeather()
  }, [country])

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        { country.languages.map(language => <li key={language.name}>{language.nativeName}</li>)}
      </ul>
      <img alt={`${country.name}-flag`} className={'flag'} src={country.flag} />
      {
        weather && <Weather isLoading={isLoading} weather={weather} />
      }
    </div>
  )
}

const Weather = ({ isLoading, weather }) => {
  return (
    <div>
      <h3>Weather</h3>
      {
        isLoading || !weather
          ? <p>Loading weather..</p>
          : <div>
            <h4>{weather.condition.text}</h4>
            <p>Temperature: {weather.temp_c} celcius</p>
            <img alt={'weather-img'} src={weather.condition.icon} />
          </div>
      }
    </div>
  )
}

const Countries = (props) => {
  const [ selectedCountry, setSelectedCountry ] = useState(null)

  const handleShowDetail = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      {
        props.countries
          .map(country => <Country key={country.name} onShowDetail={() => handleShowDetail(country)} country={country} />)
      }
      { selectedCountry &&
        <div>
          <CountryDetail country={selectedCountry} />
        </div>
      }
    </div>
  )
}

const Country = (props) => {
  return <p><button onClick={props.onShowDetail}>Show Detail</button> {props.country.name}</p>
}

function App () {
  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    let didCancel = false

    if (searchText.length > 0) {
      axios.get(`https://restcountries.eu/rest/v2/name/${searchText}`)
        .then(response => {
          if (!didCancel) {
            setCountries(response.data)
          }
        })
        .catch(err => { console.log('canceled', err) })
    }

    return () => {
      console.log('use effect return')
      didCancel = true
    }
  }, [searchText])

  const handleInputQuery = (event) => {
    setSearchText(event.target.value)
  }

  return (
    <div className='App'>
      <SearchForm value={searchText} onChange={handleInputQuery} />
      <SearchResult countries={countries} />
    </div>
  )
}

export default App
