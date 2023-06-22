import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Resources from './components/resources';
import Log from './components/log';
import Recruitment from './components/recruitment';
import Character from './components/character';
import Building from './components/building';
import Game from './components/game';
import Upgrade from './components/upgrades';
import { Tabs, Tab, OverlayTrigger, Tooltip } from 'react-bootstrap';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [moneyWorkGain, setMoneyWorkGain] = useState(1);

  const [billAmount, setBillAmount] = useState(0.5); // Set the bill amount here

  const [faithWorkGain, setFaithWorkGain] = useState(1);

  const [moneyPerMember, setMoneyPerMember] = useState(0);

  const [recruitChance, setRecruitChance] = useState(0.05);

  const [preachWorkGain, setPreachWorkGain] = useState(0.02);

  const [actions, setActions] = useState([]);

  const [daysPassed, setDaysPassed] = useState(0);

  // Unlock conditions
  const [faithThr1, setFaithThr1] = useState(false);

  const [headquartersOwned, setHeadquartersOwned] = useState(false);

  const [moneyThr1, setMoneyThr1] = useState(false);
  const [moneyThr2, setMoneyThr2] = useState(false);

  const [membersThr1, setMembersThr1] = useState(false);

 
  const [activeTab, setActiveTab] = useState("Game");
  const [activeButton, setActiveButton] = useState("none");

  // Test material
  const [testMode, setTestMode] = useState(false);
  const [speed, setSpeed] = useState(1000);

  const [resources, setResources] = useState([
    {
      name: 'Money',
      value: 0,
      max: 10000,
      perSecond: 0,
    },
    {
      name: 'Faith',
      value: 0,
      max: 1000,
      perSecond: 0,
    },
    {
      name: 'Members',
      value: 0,
      max: 5,
      perSecond: 0,
    },
    {
      name: 'Devotion',
      value: 0.5,
      max: 1.1,
      perSecond: -0.01,
    }
    // add more resources here
  ]);

  const character = [
    {
      name: 'Charisma',
      value: 1,
      max: 10,
    },
    {
      name: 'Intelligence',
      value: 1,
      max: 10,
    }
  ];


  const [buildings, setBuildings] = useState([
    {
      id: 'building1',
      name: 'Basic Headquarters',
      cost: 1000,
      owned: false,
      effect: 'membersMax',
      value: 10,
    },
    // add more buildings here
  ]);


  const [upgrades, setUpgrades] = useState([
    {
      id: 'upg1',
      name: "Cult donations",
      requirements: [
        {
          resource: 'Faith',
          cost: 1000,
        },
      ],
      benefits: [
        {
          resource: 'moneyPerMember',
          gain: 1,
        },
      ],
      flavor: 'Your members can contribute financialy to the cult',
      purchased: false,
      requiredUpgrade: null,
      category: 'Cult',
    },
    {
      id: 'upg2',
      name: 'Hymn Book',
      requirements: [
        {
          resource: 'Faith',
          cost: 10,
        },
      ],
      benefits: [
        {
          resource: 'moneyPerMember',
          gain: 1,
        },
      ],
      purchased: false,
      requiredUpgrade: 'upg1',
      category: 'Cult',
    },
    {
      id: 'upg3',
      name: 'Cult Robes',
      requirements: [
        {
          resource: 'Faith',
          cost: 50,
        },
      ],
      benefits: [
        {
          resource: 'moneyPerMember',
          gain: 2,
        },
      ],
      purchased: false,
      requiredUpgrade: 'upg1',
      category: 'Members',      
    },
    {
      id: 'upg4',
      name: 'Meditation Techniques',
      requirements: [
        {
          resource: 'Faith',
          cost: 100,
        },
      ],
      benefits: [
        {
          resource: 'faithPerMember',
          gain: 2,
        },
      ],
      purchased: false,
      requiredUpgrade: 'upg2',
      category: 'Member',      
    },
    {
      id: 'upg5',
      name: 'Blood Sacrifice',
      requirements: [
        {
          resource: 'Faith',
          cost: 500,
        },
      ],
      benefits: [
        {
          resource: 'recruitChance',
          gain: 0.1,
        },
      ],
      purchased: false,
      requiredUpgrade: 'upg4',
      category: 'Cult',      
    },
    {
      id: 'upg6',
      name: 'Brainwashing Techniques',
      requirements: [
        {
          resource: 'Faith',
          cost: 1000,
        },
      ],
      benefits: [
        {
          resource: 'moneyPerMember',
          gain: 10,
        },
      ],
      purchased: false,
      requiredUpgrade: 'upg5',
      category: 'Character',      
    },
    {
      id: 'upg7',
      name: 'Dark Rituals',
      requirements: [
        {
          resource: 'Faith',
          cost: 5000,
        },
      ],
      benefits: [
        {
          resource: 'moneyPerMember',
          gain: 20,
        },
      ],
      purchased: false,
      requiredUpgrade: 'upg6',
      category: 'Cult',      
    }
  ]);

  const saveData = {
    moneyWorkGain,
    billAmount,
    faithWorkGain,
    moneyPerMember,
    recruitChance,
    daysPassed,
    faithThr1,
    headquartersOwned,
    moneyThr1,
    moneyThr2,
    membersThr1,
    buildings,
    upgrades, 
    resources
  };


  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };


  const handleAcquireBuilding = (name, cost, effect, value, membersMax) => {
    const moneyResource = resources.find((resource) => resource.name === 'Money');
  
    if (moneyResource.value >= cost) {
      setResources((prevResources) => {
        const updatedMoney = prevResources.find((resource) => resource.name === 'Money');
        updatedMoney.value -= cost;
  
        return [...prevResources];
      });
  
      if (effect === 'membersMax') {
        setResources((prevResources) => {
          const updatedMembersMax = prevResources.find((resource) => resource.name === 'Members');
          updatedMembersMax.max += value;
  
          return [...prevResources];
        });
  
        if (name === 'Basic Headquarters') {
          setHeadquartersOwned(true);
        }
      }
  
      setActions([
        ...actions,
        'You build the stuff!',
      ]);
  
      // Set the building as owned
      const updatedBuildings = buildings.map((building) => {
        if (building.name === name) {
          return {
            ...building,
            owned: true,
          };
        }
        return building;
      });
  
      setBuildings(updatedBuildings);
    } else {
      setActions([
        ...actions,
        'Not enough money',
      ]);
    }
  };
    

  const handleRecruitClick = (cost, newMemberCount) => {
    const moneyResource = resources.find((resource) => resource.name === 'Money');
    const membersResource = resources.find((resource) => resource.name === 'Members');
  
    if (moneyResource.value >= cost && membersResource.value < membersResource.max) {
      setResources((prevResources) => {
        const updatedMoney = prevResources.find((resource) => resource.name === 'Money');
        updatedMoney.value -= cost;
  
        const updatedMembers = prevResources.find((resource) => resource.name === 'Members');
        updatedMembers.value = Math.min(updatedMembers.value + newMemberCount, updatedMembers.max);
  
        return [...prevResources];
      });
  
      setActions([
        ...actions,
        `Total members: ${membersResource.value + newMemberCount}`,
      ]);
    } else if (membersResource.value >= membersResource.max) {
      setActions([
        ...actions,
        'Failed to recruit new members. Maximum member limit reached.',
      ]);
    } else {
      setActions([
        ...actions,
        'Failed to recruit new members. Insufficient funds.',
      ]);
    }
  };


  

  const handlePurchaseUpgrade = (upgrade) => {
    // Check if the upgrade is already purchased
    if (upgrade.purchased) {
      return;
    }
  
    // Check if the player has enough resources to purchase the upgrade
    for (const requirement of upgrade.requirements) {
      const { resource, cost } = requirement;
      const resourceValue = resources.find((res) => res.name === resource)?.value || 0;
  
      if (cost > resourceValue) {
        setActions([
          ...actions,
          `Not enough ${resource}.`,
        ]);
        return;
      }
    }
  
    // Apply the effects of the upgrade
    for (const benefit of upgrade.benefits) {
      const { resource, gain } = benefit;
  
      switch (resource) {
        case 'moneyPerMember':
          setMoneyPerMember((prev) => prev + gain);
          break;
        // Handle other types of effects
        case 'recruitChance':
          setRecruitChance((prev) => prev + gain);
          break;
        // Add cases for other resources/effects
        default:
          break;
      }
    }
  
    // Update the state to mark the upgrade as purchased and withdraw the cost from the appropriate resource
    setUpgrades((prevUpgrades) =>
      prevUpgrades.map((upg) =>
        upg.id === upgrade.id
          ? {
              ...upg,
              purchased: true,
            }
          : upg
      )
    );
  
    // Deduct the required resources from the player's inventory
    for (const requirement of upgrade.requirements) {
      const { resource, cost } = requirement;
  
      setResources((prevResources) =>
        prevResources.map((res) =>
          res.name === resource
            ? {
                ...res,
                value: res.value - cost,
              }
            : res
        )
      );
    }
  };
  
  

  useEffect(() => {
    // Function to update money state
    const updateMoney = () => {
      let totalMoneyPerSecond = 0;
  
      if (activeButton === 'money') {
        totalMoneyPerSecond += moneyWorkGain;
      }
  
      totalMoneyPerSecond = 
        totalMoneyPerSecond + 
        (moneyPerMember * resources.find((resource) => resource.name === 'Members').value) - billAmount;
  
        setResources((prevResources) => {
          const updatedResources = prevResources.map((resource) => {
            if (resource.name === 'Money') {
              const newMoney = resource.value + totalMoneyPerSecond;
        
              // Check the new money value and apply the rules if :
              // - it's equal to 0 (force activity to work)
              // - it's superior to max (set value to max)
              // - it's neither of those, and we update the money value
              
              if (newMoney >= resource.max) {
                return {
                  ...resource,
                  value: resource.max,
                  perSecond: totalMoneyPerSecond,
                };
              } else if (newMoney <= 0) {
                setActiveButton('money');
                return {
                  ...resource,
                  value: 0,
                  perSecond: totalMoneyPerSecond,
                };
              } else {
                return {
                  ...resource,
                  value: newMoney,
                  perSecond: totalMoneyPerSecond,
                };
              }
            }
            
            return resource;
          });
        
          return updatedResources;
        });
  
      // Check and activate money thresholds
      if (!moneyThr1 && resources.find((resource) => resource.name === 'Money').value + totalMoneyPerSecond >= 100) {
        setMoneyThr1(true);
      } else if (!moneyThr2 && faithThr1 && resources.find((resource) => resource.name === 'Money').value + totalMoneyPerSecond >= 1000) {
        setMoneyThr2(true);
      }
  

    };
  
    // Function to update faith state
    const updateFaith = () => {
      setResources((prevResources) => {
        let totalFaithPerSecond = prevResources.find((resource) => resource.name === 'Members').value;
    
        if (activeButton === 'faith') {
          totalFaithPerSecond += faithWorkGain;
        }
    
        const updatedResources = prevResources.map((resource) => {
          if (resource.name === 'Faith') {
            const updatedFaith = {
              ...resource,
              value: resource.value + totalFaithPerSecond,
              perSecond: totalFaithPerSecond,
            };
    
            return {
              ...updatedFaith,
              value: updatedFaith.value > updatedFaith.max ? updatedFaith.max : updatedFaith.value,
              perSecond: totalFaithPerSecond,
            };
          }
          return resource;
        });
    
        return updatedResources;
      });
    
      // Check and activate faith thresholds
      const faithValue = resources.find((resource) => resource.name === 'Faith').value;
      if (!faithThr1 && faithValue + faithWorkGain >= 100) {
        setFaithThr1(true);
      }
    };
    
  
    // Function to update members state
    const updateMembers = () => {
      setResources((prevResources) => {
        let totalMembersPerSecond = 0;
    
        if (activeButton === 'recruit') {
          const chance = Math.random();
          if (chance < recruitChance && prevResources.find((resource) => resource.name === 'Members').value < prevResources.find((resource) => resource.name === 'Members').max) {
            totalMembersPerSecond += 1;
            setActions([...actions, `You recruited 1 new member for your cult`]);
          } else if (chance < recruitChance && prevResources.find((resource) => resource.name === 'Members').value >= prevResources.find((resource) => resource.name === 'Members').max) {
            setActions([...actions, `Can't recruit anymore!`]);
          }
        }
    
        const updatedResources = prevResources.map((resource) => {
          if (resource.name === 'Members') {
            return {
              ...resource,
              value: resource.value + totalMembersPerSecond,
            };
          }
          return resource;
        });
    
        return updatedResources;
      });
    
      // Check and activate members thresholds
      const membersValue = resources.find((resource) => resource.name === 'Members').value;
      if (!membersThr1 && membersValue >= 5) {
        setMembersThr1(true);
      }
    };

    const updateDevotion = () => {
      setResources((prevResources) => {
        const updatedResources = prevResources.map((resource) => {
          if (resource.name === 'Devotion') {
            let totalDevotionPerSecond = resource.perSecond;
            if(activeButton === 'preach'){
              totalDevotionPerSecond += preachWorkGain;
            }
            const newValue = resource.value + totalDevotionPerSecond; // Decrease by 1 every second
            const updatedValue = Math.max(newValue, 0); // Ensure value doesn't go below 0

            return {
              ...resource,
              value: updatedValue,
            };
          }
          return resource;
        });
        return updatedResources;
      });
    }
    
  
    // Set up the interval for periodic updates
    const interval = setInterval(() => {
      // Call the update functions for each state variable
      updateMoney();
      updateFaith();
      updateMembers();
      updateDevotion();
    }, speed);
  
    // Clean up the interval when the component unmounts or when the dependencies change
    return () => clearInterval(interval);
  }, [
    activeButton,
    moneyPerMember,
    recruitChance,
    moneyWorkGain,
    faithWorkGain,
    billAmount,
    speed,
    moneyThr1,
    moneyThr2,
    faithThr1,
    membersThr1,
    resources, // Ajout de resources comme dépendance
  ]);
  
  


  const handlePreach = () => {
    setActiveButton("preach");
  };

  const handleMoney = () => {
    setActiveButton("money");
  };

  const handleFaith = () => {
    setActiveButton("faith");
  };

  const handleRecruit = () => {
    setActiveButton("recruit");
  };

  function toggleTestMode() {
    if (testMode === false) {
      setTestMode(true);
      setSpeed(1);
    } else {
      setTestMode(false);
      setSpeed(1000);
    }
  }

  function saveGame() {
 
    const serializedData = JSON.stringify(saveData);
    localStorage.setItem('cult_game_save', serializedData);
  }

  function setStateFromParsedData(stateName, stateValue, parsedData) {
    // Check if the parsed data has a property with the state name
    if (parsedData.hasOwnProperty(stateName)) {
      stateValue(parsedData[stateName]);
    }
  }
  
  function loadGame() {
    // Retrieve the saved data from localStorage
    const savedData = localStorage.getItem('cult_game_save');
  
    if (savedData) {
      // Parse the saved data into an object
      const parsedData = JSON.parse(savedData);
  
      // Iterate over each key in the parsed data object
      Object.keys(parsedData).forEach((key) => {
        const stateValue = eval(`set${key.charAt(0).toUpperCase() + key.slice(1)}`);
        if (key === 'resources') {
          // Handle the resources state separately
          setResources(parsedData[key]);
        } else {
          setStateFromParsedData(key, stateValue, parsedData);
        }
      });
    }
  }
  
  function resetGame() {
    localStorage.removeItem('cult_game_save');
    window.location.reload();
  }


  return (
    <div className="App">
  <div className="banner">
    <h1 id='gameTitle'>Cult GPT</h1>
    <div>
      <button id='svButton' onClick={saveGame}>Save</button>
      <button id='ldButton' onClick={loadGame}>Load</button>
      <button id='rsButton' onClick={resetGame}>Reset</button>
      <button id='tsButton' onClick={toggleTestMode}>Test Mode</button>
    </div>
  </div>
  <div className="container-fluid">
    <div className="left-column">
      <div>
        <h2>Resources</h2>
      </div>
      <Resources 
        initialResources={resources} 
        faithThr1={faithThr1} 
        membersThr1={membersThr1}
      />
    </div>
    <div className="center-column">
      <Tabs defaultActiveKey="game">
      <Tab eventKey="game" title="Game">
        <Game
          moneyWorkGain={moneyWorkGain}
          handleMoney={handleMoney}
          activeButton={activeButton}
          faithWorkGain={faithWorkGain}
          handleFaith={handleFaith}
          faithThr1={faithThr1}
          recruitChance={recruitChance}
          handleRecruit={handleRecruit}
          membersThr1={membersThr1}
          handlePreach={handlePreach}
        />
      </Tab>
        {/* <Tab eventKey="recruitment" title="Recruitment">
          <Recruitment handleClick={handleRecruitClick} />
        </Tab> */}
        {faithThr1 && (
          <Tab eventKey="characteristic" title="Character">
            <Character characteristics={character}/>
          </Tab>
        )}
        {membersThr1 && (
          <Tab eventKey="building" title="Building">
            <Building buildings={buildings} handleAcquireBuilding={handleAcquireBuilding} />
          </Tab>
        )}
        {moneyThr1 && faithThr1 && (
          <Tab eventKey="upgrade" title="Upgrade">
            <Upgrade 
              upgrades={upgrades} 
              handlePurchaseUpgrade={handlePurchaseUpgrade} 
              membersThr1={membersThr1} 
              money={resources.find((resource) => resource.name === 'Money').value}
            />
          </Tab>
        )}
      </Tabs>
    </div>
    <div className="right-column">
      <div>
        <h2>Logs</h2>
      </div>
      <Log actions={actions} />
    </div>
  </div>
</div>

  );
}

export default App;