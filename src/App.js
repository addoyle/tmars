import React from 'react';
import Project from './components/Project';
import Production from './components/assets/Production';
import Resource from './components/assets/Resource';
import Tag from './components/assets/Tag';
import MegaCredit from './components/assets/MegaCredit';
import VictoryPoint from './components/assets/VictoryPoint';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Project
        type="active"
        cost="9"
        title="Inventor's Guild"
        tags={['science']}
        number="6"
        emoji="🔍"
        top={(
          <div className="text-center">
            <div class="col-1 resources">
              <span class="arrow" />
            </div>
            <div class="col-5 description">
              ACTION: LOOK AT THE TOP CARD AND EITHER BUY IT OR DISCARD IT
            </div>
          </div>
        )}
        flavor="When great minds meet, new ideas abound"
      >
      </Project>
    </div>
  );
}

export default App;
