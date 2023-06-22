import React from 'react';

function Log({ actions }) {
  return (
    <div className='logs-container'>
      <ul className='simple-list'>
        {actions
          .slice(0)
          .reverse()
          .map((action, index) => (
            <li key={index}>{action}</li>
          ))}
      </ul>
    </div>
  );
}

export default Log;
