import React from 'react';
import { Tooltip } from 'react-tooltip';


function Resources({ resources }) {
  return (
    <div className="resources">
      {resources.map(({ name, value, max }) => (
        <div key={name} className="resource">
          <div className="resource-name">{name}:</div>
          {name === 'Members' ? (
            <div className="resource-value">
              <div>{value}</div>
              <div style={{ marginLeft: '5px' }}>/ {max}</div>
            </div>
          ) : (
            <div className="resource-value">{value}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Resources;