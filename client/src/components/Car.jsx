import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Car.css';
import useFormState from '../utils/hooks/useFormState';

import Task from './Task';

const Car = ({
  match: {
    params: { vin }
  }
}) => {
  const [carData, setCarData] = useState({});
  useEffect(() => {
    async function fetchCar() {
      const { data } = await axios.get(`/api/v1/cars`);
      const car = data.filter(vehicle => vehicle.vin === vin)[0];
      setCarData(car);
    }
    fetchCar();
  }, [vin]);

  const fields = ['title', 'employee', 'notes'];
  const [formState, handleChange, clearForm] = useFormState(fields);

  const handleAddTask = async e => {
    e.preventDefault();

    if (!carData.tasks) setCarData({ ...carData, tasks: [] });
    const { title, employee, ...rest } = formState;
    let notes = rest.notes.split(',').map(note => note.trim());
    const newTask = { title, employee, notes };

    const { data } = await axios.put(`/api/v1//cars/${carData.id}`, {
      ...carData,
      tasks: carData.tasks ? [...carData.tasks, newTask] : [newTask]
    });
    setCarData(data);

    clearForm();
  };

  const handleDone = async title => {
    const { title: text } = carData.tasks.find(task => task.title === title);
    const newTasks = carData.tasks.map(task => {
      if (task.title === text) {
        task.status = 'done';
        return task;
      }
      return task;
    });

    const { data } = await axios.put(`/api/v1//cars/${carData.id}/`, {
      ...carData,
      tasks: newTasks
    });
    setCarData(data);
  };

  const handleInspection = async () => {
    const { data } = await axios.put(`/api/v1//cars/${carData.id}/`, {
      ...carData,
      inspectedStatus: !carData.inspectedStatus
    });
    setCarData(data);
  };

  const {
    color,
    dop,
    inspectedStatus = false,
    make,
    mileage,
    model,
    tasks = []
  } = carData;

  return (
    <div className='car-page'>
      <p>
        {`A ${color} ${model} car with Vehicle Identification Number ${vin}`}
      </p>

      <div className='car-details'>
        <p>Color: {color}</p>
        <p>Purchase date: {dop}</p>
        <p>Make: {make}</p>
        <p>Mileage: {mileage} miles</p>
        <p>Model: {model}</p>
        <p>VIN: {vin}</p>
      </div>

      <div className='inspected-status'>
        Inspection status:{' '}
        <button className='inspected-button' onClick={handleInspection}>
          Change inspection status
        </button>
      </div>
      <p>This car has {inspectedStatus ? ' been ' : ' not been '} inspected.</p>
      {!inspectedStatus && (
        <p>
          Employees will be able to add tasks as soon as the car has been
          inspected.
        </p>
      )}

      {inspectedStatus && (
        <div className='add-task'>
          <p>Add a task for this car.</p>
          <div>
            <form onSubmit={handleAddTask} className='add-task-form'>
              <input
                type='text'
                value={formState['title']}
                placeholder='New task'
                name='title'
                required
                onChange={handleChange}
              />
              <input
                type='text'
                value={formState['employee']}
                placeholder='Employee Name'
                name='employee'
                required
                onChange={handleChange}
              />
              <textarea
                rows='6'
                cols='10'
                value={formState['notes']}
                placeholder='Task notes, separated by commas'
                name='notes'
                required
                onChange={handleChange}></textarea>
              <button type='submit'>+ Add task</button>
            </form>
          </div>

          {tasks && tasks.length > 0 ? (
            <div id='tasks'>
              <p>This is a list of tasks required to fix the car.</p>
              <ul className='task-list'>
                {tasks.map(task => (
                  <Task key={task.title} {...task} handleDone={handleDone} />
                ))}
              </ul>
            </div>
          ) : (
            <p>There are no tasks left to fix this car.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Car;
