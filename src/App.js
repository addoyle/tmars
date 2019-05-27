import React from 'react';
import Project from './components/Project';
import Production from './components/assets/Production';
import Resource from './components/assets/Resource';
import MegaCredit from './components/assets/MegaCredit';
import VictoryPoint from './components/assets/VictoryPoint';
import './App.scss';

// <Tag name="building" />
// <Tag name="space" />
// <Tag name="science" />
// <Tag name="earth" />
// <Tag name="city" />
// <Tag name="animal" />
// <Tag name="event" />
// <Tag name="jovian" />
// <Tag name="microbe" />
// <Tag name="power" />
// <Tag name="plant" />
//
// <Resource name="plant" />
//
// <VictoryPoint />
//
// <MegaCredit>10</MegaCredit>

function App() {
  return (
    <div className="App">
      <Project
        type="automated"
        cost="8"
        title="Lightning Harvest"
        tags={['power']}
        number="46"
        requirements={{
          values: [
            {tag: 'science'},
            {tag: 'science'},
            {tag: 'science'}
          ]
        }}
        expac="corporate"
        flavor="Floating supercondensors connecting clouds with a superconducting wire. The triggered and collected discharges are beamed down to a receptor"
      >
        <div style={{
          display: 'inline-block',
          textAlign: 'center',
          width: '66%'
        }}>
          <Production>
            <Resource name="power" />
            <MegaCredit />
          </Production>
          <p style={{ textAlign: 'left' }}>
            (You must have 3 science tags to play this. Increase your energy production and your M&euro; production 1 setp each.)
          </p>
          <hr />
        </div>
        <div style={{
          display: 'inline-block'
        }}>
          <VictoryPoint point="1" />
        </div>
      </Project>
    </div>
  );
}

export default App;
