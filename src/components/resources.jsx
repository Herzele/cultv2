import React, { useState, useEffect } from 'react';

function Resources({ initialResources, faithThr1, membersThr1 }) {
  const [resources, setResources] = useState(initialResources);

  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);

  const formatValue = (value, max, isPercentage) => {
    if (isPercentage) {
      return `${(value * 100).toFixed(2)}%`;
    } else {
      return `${Math.round(value).toLocaleString()} / ${Math.round(max).toLocaleString()}`;
    }
  };

  return (
    <div className="resources">
      <table>
        <tbody>
          {resources.map(({ name, value, max, perSecond }) => (
            (name === 'Members' && !faithThr1) || (name === 'Devotion' && !membersThr1) ? null : (
              <tr key={name}>
                <td className='resTd1'>{name}</td>
                <td className='resTd2'>
                  <span style={{ color: value === max ? 'red' : 'inherit' }}>
                    {name === 'Devotion' ? formatValue(value, max, true) : formatValue(value, max)}
                  </span>
                </td>
                <td className='resTd3'>
                  <span>
                    {name === 'Devotion' ? formatValue(perSecond, true) : `${perSecond}`} /s
                  </span>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Resources;
