const SingleCountry = ({country, weather}) => {
    const languages = Object.entries(country.languages).map(([short, long]) => 
        <li key={short}>{long}</li>
    )

    const temperature = weather
        ? `${(weather.main.temp - 273.15).toFixed(2)} Celsius`
        : 'Loading...'

    const windSpeed = weather
        ? `${(weather.wind.speed).toFixed(2)} m/s`
        : 'Loading...'

    const iconURL = weather
        ? `https://openweathermap.org/img/wn/${(weather.weather[0].icon)}@2x.png`
        : null

    const alt = weather
        ? weather.weather[0].description
        : null

    return(
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h3>languages:</h3>
            <ul>{languages}</ul>
            <img src={country.flags.png} alt={country.flags.alt} /> 
            <h2>{`Weather in ${country.capital}`}</h2>
            <div>temperature {temperature}</div>
            <img src={iconURL} alt={alt} />
            <div>wind {windSpeed}</div>
        </div>
    )
}

export default SingleCountry