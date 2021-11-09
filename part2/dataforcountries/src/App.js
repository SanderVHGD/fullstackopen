import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({value, onChange}) => {
  return (
    <div>
      Find countries 
      <input 
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const Country = ({country}) => {
  const imgAlt = "flag " + country.name.common

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language => 
          <li key={language}>{language}</li>
        )}
      </ul>
      <img
        src={country.flags.png}
        alt={imgAlt}
      />
    </div>
  )
}

const Countries = ({countries}) => {
  let display
  if(countries.length > 10) display = <div>Too many matches, specify another filter</div>
  else if(countries.length > 1) display = countries.map((country) => <div key={country.name.common}>{country.name.common}</div>)
  else if(countries.length > 0) display = <Country country={countries[0]} />
  else display = <div>No matches, specify another filter</div>

  return (
    <div>
      {display}
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => setSearch(event.target.value)

  const countriesToShow = countries.filter(
    country => country.name.common.toLowerCase().indexOf(search.toLowerCase()) !== -1 
  )

  return (
    <div>
      <Search
        value={search}
        onChange={handleSearchChange}
      />
      <Countries
        countries={countriesToShow}
      />
    </div>
  );
}

export default App;
