import React from 'react';
import Event from '../Event';
import { Resource, Param, Tile } from '../../client/components/assets/Assets';

const desc = 'Raise temperature 2 steps and place 2 ocean tiles. Remove up to 6 plants from any player.';

export default new Event({
  number: 80,
  title: 'Giant Ice Asteroid',
  cost: 36,
  tags: ['space', 'event'],
  desc,
  flavor: 'Crash it. The bigger, the better',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '☄',
  layout: (
    <div className="text-center">
      <div className="resources middle">
        <Param name="temperature" />
        <Param name="temperature" />
        <Tile name="ocean" />
        <Tile name="ocean" />
        &nbsp;<span>&ndash;6</span>
        <Resource name="plant" anyone />
      </div>
      <div className="description m-bottom">{desc}</div>
    </div>
  )
});
