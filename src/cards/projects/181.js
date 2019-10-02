import React from 'react';
import Event from '../../client/components/Event';
import { Tile } from '../../client/components/assets/Assets';

const desc = 'Requires +2°C or warmer. Place 1 ocean tile.';

export default new Event({
  number: 181,
  title: 'Ice Cap Melting',
  cost: 5,
  tags: ['event'],
  restriction: {
    value: 2,
    param: 'temperature'
  },
  desc,
  flavor: 'Getting the water back from the poles',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '☃️',
  layout: (
    <div className="text-center">
      <div className="resources">
        <Tile name="ocean" />
      </div>
      <div className="description">{desc}</div>
    </div>
  )
});