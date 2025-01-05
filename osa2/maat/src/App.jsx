import axios from 'axios'
import { useEffect, useState } from 'react'
import CountryFinder from './components/CountryInput'
import ListCountries from './components/ListCountries'
import SingleCountry from './components/SingleCountry'

function App() {
  const [countries, setCountries] = useState([])
  const [findCountry, setFindCountry] = useState('')
  const [showCountry, setShowCountry] = useState('')
  const [weather, setWeather] = useState(null)

  const openweatherApiKey = import.meta.env.VITE_OPENWEATHER_KEY

  useEffect(() => {
    console.log('fetching countries...')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(initialCountries => {
        console.log(initialCountries)
        setCountries(initialCountries.data)
      })
      .catch(error => console.log(error))
  }, [])
  
  const countriesToShow = findCountry !== ''
    ? countries.filter(country => country.name.common.toString().toLowerCase().includes(findCountry))
    : countries
  
  useEffect(() => {
    if (countriesToShow.length === 1 || showCountry) {
      const name = showCountry || countriesToShow[0]
      console.log('fetching weather')
      const getUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${name.capitalInfo.latlng[0]}&lon=${name.capitalInfo.latlng[1]}&appid=${openweatherApiKey}`
      axios
          .get(getUrl)
          .then(weather => {
              console.log(weather)
              setWeather(weather.data)
          })
          .catch(error => console.log(error))
    } else {
      setWeather(null)
    }
  }, [findCountry, showCountry])
  
  const handleCountryChange = (event) => {
    setFindCountry(event.target.value.toLowerCase())
    setShowCountry()
  }

  const onPressShow = (countryToShow) => {
    if (countryToShow) {
      setShowCountry(countryToShow)
    }
  }

  return (
    <div>
      <CountryFinder handler={handleCountryChange}/>
      {showCountry && <SingleCountry country={showCountry} weather={weather}/>}
      {countriesToShow.length === 1 && <SingleCountry country={countriesToShow[0]} weather={weather}/>}
      {(!showCountry && !(countriesToShow.length === 1)) && 
      <ListCountries countryList={countriesToShow} buttonHandler={onPressShow}/>}
    </div>
  )
}

export default App
