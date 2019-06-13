import React from 'react';
import Automated from '../../client/components/Automated';
import { Resource, Production, VictoryPoint } from '../../client/components/assets/Assets';

const desc = 'Requires 2% oxygen. Increase your heat production 2 steps and your plant production 2 steps.';

export default new Automated({
  number: 18,
  title: 'Methane From Titan',
  cost: 28,
  tags: ['jovian', 'space'],
  restriction: {
    value: 2,
    param: 'oxygen'
  },
  desc,
  flavor: 'Using Titan\'s liquid methane as fuel will add carbon and heat to Mars',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🌥',
  layout: (
    <div className="flex gutter">
      <div className="col-2">
        <Production>
          <div className="flex">
            <Resource name="heat" />
            <Resource name="heat" />
          </div>
          <div className="flex">
            <Resource name="plant" />
            <Resource name="plant" />
          </div>
        </Production>
      </div>
      <div className="col-3 middle">
        <div className="description">{desc}</div>
      </div>
      <div className="col-2 bottom">
        <VictoryPoint><span className="big point">2</span></VictoryPoint>
      </div>
    </div>
  )
});
