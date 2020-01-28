import React from 'react';
import Automated from '../../client/components/cards/Automated';
import { Production, Resource } from '../../client/components/assets/Assets';

const desc = 'It must be -14°C or colder. Increase your plant production 2 steps.';

export default new Automated({
  number: 155,
  title: 'Designed Microorganisms',
  cost: 16,
  tags: ['science', 'microbe'],
  restriction: {
    max: true,
    value: -14,
    param: 'temperature'
  },
  desc,
  flavor: 'Specializing in extremely cold conditions',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🦠',
  layout: (
    <div className="text-center">
      <Production>
        <div className="flex">
          <Resource name="plant" />
          <Resource name="plant" />
        </div>
      </Production>
      <div className="description m-bottom">{desc}</div>
    </div>
  )
});
