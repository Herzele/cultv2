import React from 'react';

function Log({ actions }) {
  return (
    <div>
      <ul>
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
