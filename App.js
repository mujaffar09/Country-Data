
import React,{useState, useEffect} from 'react';
import axios from 'axios';

const App=()=>{
  const [countries,setCountries]=useState([])
  const [find,setFind]=useState['']
  useEffect(()=>{
     axios.get('https://restcountries.com/v3.1/all')
     .then(response=>setCountries(response.data.map(({name,capital,area,languages,flags})=>({
      name: name.common,
      capital,
      area,
      languages,
      flags,
     }))
       )
     )
     
  },[])
  const handleChange=e=>setFind(e.target.value)
  const filteredCountries=countries.filter(country=>country.name.toLowerCase().includes(find))
  console.log(filteredCountries)
  return (
    <div >
       <p>
        find countries <input value={find} onChange={handleChange}/>
       </p>
       {filteredCountries.length>10 &&(
        <div> Too many matches, specify another filter</div>
       )}
       {filteredCountries.length<=10 &&
       filteredCountries.length>1&&
       filteredCountries.map(country=>(
       <div key = {country.name}>{country.name}</div> ))}
       {filteredCountries.length ===1} && (
        <div>
         <h1>{filteredCountries[0].name}</h1>
         <div>capital {filteredCountries[0].capital}</div>
         <div>area {filteredCountries[0].area}</div>
         <h2>Languages</h2>
         <ul>
         {Object.values(filteredCountries[0].languages).map(language=>(
          <li key ={language}>{language}</li>
         ))}
         </ul>
        </div>
       )
    </div>
  )
}

export default App