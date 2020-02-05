import React from 'react';
import Event from '../Event';
import { Resource, Param, Tile } from '../../client/components/assets/Assets';

const desc = 'Place 2 ocean tiles.';

export default new Event({
  number: 78,
  title: 'Ice Asteroid',
  cost: 23,
  tags: ['space', 'event'],
  desc,
  flavor: 'We need its water down here',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '☄',
  layout: (
    <div className="text-center">
      <div className="resources middle">
        <Tile name="ocean" />
        <Tile name="ocean" />
      </div>
      <div className="description m-bottom">{desc}</div>
    </div>
  )
});
