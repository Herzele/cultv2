import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

function Upgrade({ upgrades, handlePurchaseUpgrade, membersThr1, money }) {
  const handleClick = (upgrade) => {
    handlePurchaseUpgrade(upgrade);
  };

  const renderTooltip = (upgrade) => (
    <Tooltip id={upgrade.id} className="upgrade-tooltip">
      <div className="upgrade-title">{upgrade.name}</div>
      <div className="upgrade-flavor">{upgrade.flavor}</div>
      <div className="upgrade-requirements">
        <table className='upgrade-table'>
          <thead>
            <tr>
              <th className='thRes'>Resource</th>
              <th className='thVal'>Cost</th>
            </tr>
          </thead>
          <tbody>
            {upgrade.requirements.map((requirement) => (
              <tr key={requirement.resource}>
                <td className="upgrade-resource">{requirement.resource}</td>
                <td>{requirement.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="upgrade-benefits">
        <table className='upgrade-table'>
          <thead>
            <tr>
              <th className='thRes'>Resource</th>
              <th className='thVal'>Gain</th>
            </tr>
          </thead>
          <tbody>
            {upgrade.benefits.map((benefits) => (
              <tr key={benefits.resource}>
                <td className="upgrade-resource">{benefits.resource}</td>
                <td>{benefits.gain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Tooltip>
  );

  return (
    <div className="upgrades">
      {upgrades.map((upgrade) => {
        const requiredUpgradePurchased =
          !upgrade.requiredUpgrade ||
          (upgrades.find((u) => u.id === upgrade.requiredUpgrade) || {}).purchased;

        if (requiredUpgradePurchased) {
          return (
            <div key={upgrade.id}>
              <OverlayTrigger placement="bottom" overlay={renderTooltip(upgrade)}>
                <Button
                  className="upgrade-button"
                  onClick={() => handleClick(upgrade)}
                  disabled={upgrade.purchased || upgrade.cost > money}
                >
                  {upgrade.name}
                </Button>
              </OverlayTrigger>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default Upgrade;
