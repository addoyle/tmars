import React from 'react';
import Event from '../Event';
import {
  Resource,
  Param,
  Tile
} from '../../../client/game/components/assets/Assets';

const desc = 'Gain 2 plants. Raise oxygen level 1 step and place an ocean tile';

export default new Event({
  number: 75,
  title: 'Towing A Comet',
  cost: 23,
  tags: ['space', 'event'],
  desc,
  flavor: 'By aerobraking it we get its contents without the impact',
  action: () => {},
  emoji: '☄',
  layout: (
    <div className="text-center">
      <div className="resources middle">
        <Resource name="plant" />
        <Resource name="plant" />
        <Param name="oxygen" />
        <Tile name="ocean" />
      </div>
      <div className="description">{desc}</div>
    </div>
  )
});
