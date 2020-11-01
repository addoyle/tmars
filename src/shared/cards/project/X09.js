import React from 'react';
import Event from '../Event';
import { Resource } from '../../../client/game/components/assets/Assets';

const desc = 'Requires that you have 2 Party Leaders. Gain 1 TR.';

export default new Event({
  number: 'X09',
  title: 'Political Alliance',
  cost: 4,
  tags: ['event'],
  set: ['turmoil', 'promo'],
  restriction: {
    value: 2,
    param: 'leader'
  },
  desc,
  flavor: 'I think we can both benefit from this arrangement',
  action: () => {},
  emoji: '🤝',
  layout: (
    <div className="text-center">
      <div className="resources">
        <Resource name="tr" />
      </div>
      <div className="m-top m-bottom description">{desc}</div>
    </div>
  )
});
