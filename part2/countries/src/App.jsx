import { useState } from 'react'
import { useEffect } from 'react'
import countriesService from './services/countries'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [needle, setNeedle] = useState('')
  const [foundCountries, setFoundCountries] = useState(null)

  const getFilteredCountries = (c) => c.name.common.toLowerCase().includes(needle.toLowerCase())

  useEffect(() => {
    countriesService.getAll().then(c => setCountries(c))
  }, [])

  useEffect(() => {
    if (countries != null) {
      const tempFoundCountries = countries.filter(c => getFilteredCountries(c))
      console.log(tempFoundCountries)
      if (tempFoundCountries.length < 10) setFoundCountries(tempFoundCountries)
      else setFoundCountries(null)
    }
  }, [needle])

  const handleSearch = (event) => {
    setNeedle(event.target.value)
  }

  return (
    <>
      <div>
        find countries <input type="text" value={needle} onChange={handleSearch} />
      </div>
      {(foundCountries) ?
        ((foundCountries.length != 0) ? 
          ((foundCountries.length == 1) ? 
            <Country key={foundCountries[0].cca3} country={foundCountries[0]} withDetails={true}/>
            : foundCountries.map(c => <Country key={c.cca3} country={c} withDetails={false}/>))
          : <div>No results</div>)
        : <div>Too many matches, specify another filter</div>}
    </>
  )
}

export default App
