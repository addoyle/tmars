import React from 'react';
import Automated from '../../client/components/cards/Automated';
import { Production, Resource } from '../../client/components/assets/Assets';

const desc = 'Requires -24°C or warmer. Increase your plant production 1 step.';

export default new Automated({
  number: 159,
  title: 'Lichen',
  cost: 7,
  tags: ['plant'],
  restriction: {
    value: -24,
    param: 'temperature'
  },
  desc,
  flavor: 'Slow growing, but very resilient',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '💚',
  layout: (
    <div className="text-center">
      <Production>
        <div className="flex">
          <Resource name="plant" />
        </div>
      </Production>
      <div className="description text-center m-bottom">{desc}</div>
    </div>
  )
});
