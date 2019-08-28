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
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        { country.languages.map(language => <li key={language.name}>{language.nativeName}</li>)}
      </ul>
      <img className={'flag'} src={country.flag} />
    </div>
  )
}

const Countries = (props) => {
  const [ selectedCountry, setSelectedCountry ] = useState(props.country)
  const handleShowDetail = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      {
        props.countries
          .map(country => <Country key={country.name} onShowDetail={() => handleShowDetail(country)} country={country} />)
      }
      { selectedCountry && <CountryDetail country={selectedCountry} /> }
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
    if (searchText.length > 0) {
      axios.get(`https://restcountries.eu/rest/v2/name/${searchText}`)
        .then(response => setCountries(response.data))
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
