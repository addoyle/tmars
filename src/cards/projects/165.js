import React from 'react';
import Automated from '../../client/components/Automated';
import { Production, Resource } from '../../client/components/assets/Assets';

const desc = 'Decrease your energy production 4 steps and increase your plant production 2 steps. Raise your TR 3 steps.';

export default new Automated({
  number: 165,
  title: 'Magnetic Field Generators',
  cost: 20,
  tags: ['building'],
  desc,
  flavor: 'By generating a magnetic field, you can protect organisms from cosmic radiation',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🧲',
  layout: (
    <div className="text-center">
      <div className="flex gutter">
        <div className="col-1 text-center">
          <Production>
            <div className="flex">
              <span className="middle">&ndash;4</span>
              <Resource name="power" />
            </div>
            <div className="flex">
              <div className="col-1">+</div>
              <Resource name="plant" />
              <Resource name="plant" />
            </div>
          </Production>
        </div>
        <div className="col-1 text-center middle">
          <div className="resources">
            <span>3</span>
            <Resource name="tr" />
          </div>
        </div>
      </div>
      <div className="description">{desc}</div>
    </div>
  )
});
