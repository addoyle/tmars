import React from 'react';
import Event from '../Event';
import { Tile } from '../../../client/game/components/assets/Assets';

const desc = 'Requires -8°C or warmer. Place 1 ocean tile.';

export default new Event({
  number: '191',
  title: 'Permafrost Extraction',
  cost: 8,
  tags: ['event'],
  restriction: {
    value: -8,
    param: 'temperature'
  },
  desc,
  flavor: 'Thawing the subsurface',
  tile: 'ocean',
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
