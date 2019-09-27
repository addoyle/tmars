import React from 'react';
import Automated from '../../client/components/Automated';
import { Tile, Resource } from '../../client/components/assets/Assets';

const desc = 'Gain 1 plant for each city tile in play.';

export default new Automated({
  number: 96,
  title: 'Greenhouses',
  cost: 6,
  tags: ['plant', 'building'],
  desc,
  flavor: 'Places to conduct bio research and experiments',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🏡',
  layout: (
    <div className="flex gutter">
      <div className="col-1 resources text-center middle">
        <Resource name="plant" />/<Tile name="city" anyone />
      </div>
      <div className="col-1 description text-center middle">{desc}</div>
    </div>
  )
});