import React from 'react';

function Building({ name, cost, effect, onAcquireBuilding }) {
  const handleClick = () => {
    onAcquireBuilding(name, effect);
  };

  return (
    <div className="building">
      <div className="building-name">{name}</div>
      <div className="building-cost">Cost: {cost}</div>
      <div className="building-effect">{effect}</div>
      <button onClick={handleClick}>Acquire</button>
    </div>
  );
}

export default Building;