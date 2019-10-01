import React from 'react';
import Event from '../../client/components/Event';
import { Tile } from '../../client/components/assets/Assets';

const desc = 'Requires -8°C or warmer. Place 1 ocean tile.';

export default new Event({
  number: 191,
  title: 'Permafrost Extraction',
  cost: 8,
  tags: ['event'],
  restriction: {
    value: -8,
    param: 'temperature'
  },
  desc,
  flavor: 'Thawing the subsurface',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '👨‍🔧',
  layout: (
    <div className="text-center">
      <div className="resources">
        <Tile name="ocean" />
      </div>
      <div className="description">{desc}</div>
    </div>
  )
});
