const ListCountries = ({countryList, buttonHandler}) => {
    if (countryList) {
        if (countryList.length >= 10) {
            return(
                <div>Too many matches, specify another filter</div>
            )
        } else {
            return(
                <div>
                    {countryList.map(country => (
                        <div>
                            {country.name.common} <button onClick={() => buttonHandler(country)}>Show</button>
                        </div>)
                    )}
                </div>
            )
        }
    } else {
        return null
    }
}

export default ListCountries