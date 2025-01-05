const CountryFinder = ({handler}) => {
    return(
        <div>
            find countries <input type="text" onChange={handler}/>
        </div>
    )
}

export default CountryFinder