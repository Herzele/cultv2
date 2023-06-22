import React from 'react';

function Recruitment({ money, handleClick }) {
  const recruitmentOptions = [
    {
      name: 'Free meals',
      cost: 5,
      newMemberCount: 2,
    },
    {
      name: 'Charity work',
      cost: 10,
      newMemberCount: 5,
    },
    {
      name: 'Advertising',
      cost: 20,
      newMemberCount: 10,
    },
  ];

  return (
    <div>
      <h2>Recruitment Options</h2>
      {recruitmentOptions.map((option) => (
        <button
          key={option.name}
          onClick={() => handleClick(option.cost, option.newMemberCount)}
          disabled={option.cost > money}
          title={`${option.newMemberCount} new members`}
        >
          {option.name} ({option.cost} money)
        </button>
      ))}
    </div>
  );
}

export default Recruitment;
