import React from 'react';
import Automated from '../../client/components/cards/Automated';
import { VictoryPoint } from '../../client/components/assets/Assets';

const desc = 'Oxygen must be 5% or less.';

export default new Automated({
  number: 1,
  title: 'Colonizer Training Camp',
  cost: 8,
  tags: ['jovian', 'building'],
  restriction: {
    max: true,
    value: 5,
    param: 'oxygen'
  },
  vp: 2,
  desc,
  flavor: 'Preparing for settlement of the moons of Jupiter',
  emoji: '🏕',
  layout: (
    <div className="flex">
      <div className="description col-3 text-center middle">{desc}</div>
      <div className="col-1 middle">
        <VictoryPoint>
          <span className="point big">2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
