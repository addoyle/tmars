import React from 'react';
import Automated from '../../client/components/Automated';
import { Production, Resource } from '../../client/components/assets/Assets';

const desc = 'Requires 3 ocean tiles and that you lose 1 plant. Increase your plant production 1 step.';

export default new Automated({
  number: 122,
  title: 'Moss',
  cost: 4,
  tags: ['plant'],
  restriction: {
    value: 3,
    tile: 'ocean'
  },
  desc,
  flavor: 'Efficient soil makers',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🥦',
  layout: (
    <div className="text-center">
      <div className="flex gutter center">
        <div className="resources middle">
          <span>&ndash;</span>
          <Resource name="plant" />
        </div>
        <Production>
          <div className="flex">
            <Resource name="plant" />
          </div>
        </Production>
      </div>
      <div className="description">{desc}</div>
    </div>
  )
});
