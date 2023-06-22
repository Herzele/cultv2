import React, { useState, useEffect } from 'react';

function Resources({ initialResources, faithThr1 }) {
  const [resources, setResources] = useState(initialResources);

  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);

  return (
    <div className="resources">
      <table>
        <tbody>
          {resources.map(({ name, value, max, perSecond }) => (
            (name === 'Members' && !faithThr1) ? null : (
              <tr key={name}>
                <td className='resTd1'>{name}</td>
                <td className='resTd2'>
                  <span style={{ color: value === max ? 'red' : 'inherit' }}>
                    {`${Math.round(value).toLocaleString()} / ${max.toLocaleString()}`}
                  </span>
                </td>
                <td className='resTd3'>{`${perSecond} /s`}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Resources;
