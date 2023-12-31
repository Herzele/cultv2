import React, { useState, useEffect } from 'react';

function Resources({ initialResources, faithThr1, membersThr1 }) {
  const [resources, setResources] = useState(initialResources);

  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);

  const formatValue = (value, isPercentage) => {
    if (isPercentage) {
      return `${(value * 100).toFixed(0)}% `;
    } else {
      return value < 100000 ? value.toFixed(0) : `${(value / 1000).toFixed(1)}K`;
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
                    {name === 'Devotion' ? formatValue(value, true) : formatValue(value)} 
                    &nbsp;/&nbsp;
                    {name === 'Devotion' ? formatValue(max, true) : formatValue(max)} 
                  </span>
                </td>
                <td className='resTd3'>
                  <span>
                    {name === 'Devotion' ? formatValue(perSecond, true) : `${formatValue(perSecond)}`} /s
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
