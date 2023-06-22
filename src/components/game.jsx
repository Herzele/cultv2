import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

function Game({ 
  moneyWorkGain, 
  handleMoney, 
  activeButton, 
  faithWorkGain, 
  handleFaith, 
  faithThr1,
  membersThr1,
  devotionGain,
  handlePreach,
  recruitChance, 
  handleRecruit }) {
  return (
    <div>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="money-tooltip">Money Gain: {moneyWorkGain}</Tooltip>}
      >
        <Button
          className="action-button"
          onClick={handleMoney}
          disabled={activeButton === 'money'}
        >
          Work
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="faith-tooltip">Faith Gain: {faithWorkGain}</Tooltip>}
      >
        <Button
          className='action-button'
          onClick={handleFaith}
          disabled={activeButton === 'faith'}
        >
          Pray
        </Button>
      </OverlayTrigger>
      {faithThr1 && (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="recruit-tooltip">Recruit chance: {recruitChance}</Tooltip>}
        >
          <Button
            className='action-button'
            onClick={handleRecruit}
            disabled={activeButton === 'recruit'}
          >
            Recruit
          </Button>
        </OverlayTrigger>
      )}
      {membersThr1 && (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="preach-tooltip">Devotion gained : {devotionGain}</Tooltip>}
        >
          <Button
            className='action-button'
            onClick={handlePreach}
            disabled={activeButton === 'preach'}
          >
            Preach
          </Button>
        </OverlayTrigger>
      )}
    </div>
  );
}

export default Game;
