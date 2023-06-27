import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

function Building({ buildings, handleAcquireBuilding, maxMembers, money }) {
  const handleClick = (name, cost, effect, value) => {
    handleAcquireBuilding(name, cost, effect, value, maxMembers);
  };

  return (
    <div className="buildings">
      {buildings.map((building) => (
        <OverlayTrigger
          key={building.id}
          placement="bottom"
          overlay={
            <Tooltip id={`tooltip-${building.id}`}>
              <div>Cost: {building.cost}</div>
              <div>Effect: {building.effect}</div>
            </Tooltip>}
        >
          <Button
            className="building-button"
            onClick={() => handleClick(building.name, building.cost, building.effect, building.value)} 
            disabled={building.owned || building.cost > money}
          >
            {building.name}
          </Button>
        </OverlayTrigger>
      ))}
    </div>
  );
}


export default Building;
