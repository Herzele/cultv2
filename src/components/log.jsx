import React from 'react';

function Log({ logs }) {
  return (
    <div className='logs-container'>
      <ul className='simple-list'>
        {logs
          .slice(0)
          .reverse()
          .map((logs, index) => (
            <li key={index}>{logs}</li>
          ))}
      </ul>
    </div>
  );
}

export default Log;
