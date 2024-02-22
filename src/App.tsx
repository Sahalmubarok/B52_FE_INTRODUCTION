import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  
  const [selectedProvinces, setSelectedProvinces] = useState("");
  const [selectedCities, setSelectedCities] = useState("");
  const [selectedState, setSelectedState] = useState("");

 
  useEffect(() => {
      fetch ("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json ")
      .then((response) => response.json())
      .then((data) => setProvinces(data))
      .catch((error) => console.log("error fetching provinces", error));
  }, []);

  useEffect(() => {
    if (selectedProvinces !== "") {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinces}.json`)
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.log("error fetching cities", error));
      }
  }, [selectedProvinces]);

  useEffect(() => {
    if (selectedCities !== "") {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedCities}.json`)
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.log("error fetching states", error));
      }
  }, [selectedCities]);

  useEffect(() => {
    setSelectedState("");
  }, [selectedProvinces]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProvincesId = parseInt(event.target.value, 10);
    console.log("selected Provinces", selectedProvincesId);
    setSelectedProvinces(selectedProvincesId);
  }

  const handleChangeCities = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCitiesId = parseInt(event.target.value, 10);
    console.log("selected Cities", selectedCitiesId);
    setSelectedCities(selectedCitiesId);
  }

return   (
  <div className="p-5 bg-secondary text-white">
    <div className="container d-flex justify-content-center align-item-center vh-100 mt-2 border-dark">
      <div className="w-50">
        <h1 className="text-center">Wilayah Indonesia</h1>
        <label className="fst-italic">provinsi</label>
        <select className="form-select mb-3" aria-label="Default select example" onChange={handleChange} >
        <option value="">-- Pilih Provinsi --</option>
          {provinces.map((province) => {
            return(
            <option key={province.id} value={province.id}>
              {province.name}
            </option>
            )
            })}
        </select>

        <label className="fst-italic">Kabupaten</label>
        <select className="form-select mb-3" aria-label="Default select example" onChange={handleChangeCities} >
          <option value="">-- Pilih Kota/Kabupaten --</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>

        <label className="fst-italic">Kecamatan</label>
        <select className="form-select mb-3" aria-label="Default select example">
          <option value="">-- Pilih Kecamatan --</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>

      </div>
    </div>  
  </div>
)}

export default App

// import { useState } from "react"

// function App() {
//   const [ data, setData ] = useState(0)

//   console.log(data);
  
//   const sum = () : void => {
//     setData(data + 1)
//   }

//   return (
//     <>
//       <p>Counting</p>
//       <p>{data}</p>
//       <button onClick={sum}>Add</button>
//     </>
//   )
// }

// export default App

// import SayHello from "./SayHello"
// import Navbar from "./components/navbar/navbar"

// function App() {
//   return (
//     <>
//       <p>Sahal</p>
//       <p>Sahal Mubarok</p>
//       <SayHello/>
//       <Navbar/>
//     </>
//   )
// }

// export default App