import React from 'react';

function Character({ characteristics }) {
    return (
      <div className='mainSheet'>
        <h2>Character Sheet</h2>
        <table>
          <tbody>
            {characteristics.map(({ name, value, max }) => (
              <tr key={name}>
                <td className='resTd1'>{name}</td>
                <td className='resTd2'>
                  <span style={{ color: value === max ? 'red' : 'inherit' }}>
                    {`${Math.round(value).toLocaleString()} / ${max.toLocaleString()}`}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  

export default Character;
