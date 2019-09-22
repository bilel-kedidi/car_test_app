import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { capitalize, fetchData } from '../utils/functions';
import useFormState from '../utils/hooks/useFormState';
import './App.css';

const App = () => {
  const fields = ['vin', 'make', 'model', 'color', 'mileage', 'dop'];
  const [formState, handleChange, clearForm] = useFormState(fields);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      const vehicles = await fetchData('/api/v1/cars');
      console.log(vehicles)
      const vins = vehicles.map(({ vin }) => vin);
      setVehicles(vins);
    }
    fetchCars();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const { data } = await axios.post('/api/v1/cars', formState);
    setVehicles([...vehicles, data.vin]);

    clearForm();
  };

  const setPlaceholder = field => {
    if (field === 'vin') return 'Vehicle Identification Number';
    else if (field === 'dop') return 'DD/MM/YYYY';
    else return capitalize(field);
  };

  return (
    <div className='app'>
      Register a new vehicle:
      <form onSubmit={handleSubmit} className='register-vehicle'>
        {fields.map(field => (
          <label htmlFor={field} key={field}>
            <p>
              {field === 'dop'
                ? 'Date of purchase:  '
                : `${capitalize(field) + ': '}`}
            </p>

            <input
              required
              id={field}
              type='text'
              name={field}
              value={formState[field]}
              onChange={handleChange}
              placeholder={setPlaceholder(field)}
            />
          </label>
        ))}
        <div className='submit-button'>
          <button type='submit'>Submit</button>
        </div>
      </form>
      {vehicles.length > 0 && (
        <div className='existing-vehicles'>
          Existing vehicles by Identification number
          <div className='vehicles-list'>
            {vehicles.map(vin => (
              <Link key={vin} to={`/car/${vin}`}>
                {vin}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
