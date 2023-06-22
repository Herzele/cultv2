import React from 'react';

function Game({ money, handleClick }) {
  return (
    <div>
      <h1>Cult GPT</h1>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}

export default Game;