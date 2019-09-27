import React from 'react';
import Event from '../../client/components/Event';
import { Resource, Param, Tile } from '../../client/components/assets/Assets';

const desc = 'Gain 2 plants. Raise oxygen level 1 step and place an ocean tile';

export default new Event({
  number: 75,
  title: 'Towing A Comet',
  cost: 23,
  tags: ['space', 'event'],
  desc,
  flavor: 'By aerobraking it we get its contents without the impact',
  clientAction: game => {},
  serverAction: game => {},
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