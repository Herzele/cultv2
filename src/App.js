import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip'
import Resources from './components/resources';
import Game from './components/game';
import Log from './components/log';
import Recruitment from './components/recruitment';
import Building from './components/building';

import './App.css';

function App() {
  const [money, setMoney] = useState(1);
  const [faith, setFaith] = useState(1);
  const [members, setMembers] = useState(1);
  const [maxMembers, setMaxMembers] = useState(5);
  const [actions, setActions] = useState([]);


  const buildings = [
    {
      name: 'Basic Headquarters',
      cost: 1000,
      effect: 10,
    },
    // add more buildings here
  ];


  const handleAcquireBuilding = (name, cost, effect, maxMembers) => {
    if (money >= cost) {
      setMoney(money - cost);
      if (effect === maxMembers) {
        setMaxMembers(maxMembers + effect);
      }
    }
  };

  const handleRecruitClick = (cost, newMemberCount) => {
    if (money >= cost && members < maxMembers) {
      setMoney((prevMoney) => prevMoney - cost);
      setMembers((prevMembers) => Math.min(prevMembers + newMemberCount, maxMembers));
      setActions([
        ...actions,
        `Total members: ${members + newMemberCount}`,
      ]);
    } else if (members >= maxMembers) {
      setActions([
        ...actions,
        `Failed to recruit new members. Maximum member limit reached.`
      ]);
    } else {
      setActions([
        ...actions, 
        `Failed to recruit new members. Insufficient funds.`
      ]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFaith(faith + members);
      console.log(faith);
      console.log(members);
    }, 1000);
    return () => clearInterval(interval);
  }, [faith, members]);

  const resources = [
    {
      name: 'Money',
      value: money,
    },
    {
      name: 'Faith',
      value: faith,
    },
    {
      name: 'Members',
      value: members,
      max: maxMembers,
    },
    // add more resources here
  ];

  const moneyClick = () => {
    setMoney(money + 1);
    setActions([...actions, `Earned 1 money.`]);
  };



  return (
    <div className="App">
      <div className="left-column">
        <div>
          <h2>Ressources</h2>
        </div>
        <Resources resources={resources} />
      </div>
      <div className="center-column">
        <Game money={money} handleClick={moneyClick} />
        <Recruitment handleClick={handleRecruitClick} />
        <Building />

      </div>
      <div className="right-column">
        <div>
          <h2>Logs</h2>
        </div>
        <Log actions={actions} />
      </div>
    </div>
  );
}

export default App;