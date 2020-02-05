import React from 'react';
import Automated from '../Automated';
import { Production, Resource } from '../../client/components/assets/Assets';

const desc = 'Requires 2 oceans. Increase your plant production and your heat production 1 step each.';

export default new Automated({
  number: 211,
  title: 'Snow Algae',
  cost: 12,
  tags: ['plant'],
  set: 'promo',
  restriction: {
    value: 2,
    tile: 'ocean'
  },
  desc,
  flavor: 'Protected by the ice and the micro-environment it creates inside, making the ice darker',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '❄️',
  layout: (
    <div className="flex gutter m-bottom">
      <div className="middle text-center">
        <Production>
          <div className="flex">
            <Resource name="plant" />
            <Resource name="heat" />
          </div>
        </Production>
      </div>
      <div className="description middle text-center">{desc}</div>
    </div>
  )
});
