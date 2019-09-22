import React from 'react';
import './Task.css';

const Task = ({ handleDone, notes, employee, status = 'not done', title }) => {
  return (
    <div className='task-div'>
      <p className='task-title'>{title}</p>
      <p>
        This task was created by {employee} and is {status}
      </p>
      {notes.length > 0 ? (
        <div className='note-div'>
          <p>This task has a few blockers: </p>
          <ul className='note-list'>
            {notes.map(note => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No blockers have been added for this task</p>
      )}
      <button onClick={() => handleDone(title)}>Mark as done</button>
    </div>
  );
};

export default Task;
