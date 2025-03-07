import { useState } from "react"

const Country = ({country, withDetails}) => {
    const [show, setShow] = useState(withDetails)

    return (
        (show) ? 
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital {country.capital[0]}</div>
            <div>Area {country.area}</div>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
            </ul>
            <img src={country.flags.png} alt="" style={{ border: '1px solid black' }} />
        </div>
        : <div>{country.name.common} <button onClick={() => setShow(!show) }>Show</button></div>
    )
}

export default Country