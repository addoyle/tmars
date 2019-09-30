import React from 'react';
import Event from '../../client/components/Event';
import { Tile, Param } from '../../client/components/assets/Assets';

const desc = 'Place 1 ocean tile and draw 1 card.';

export default new Event({
  number: 161,
  title: 'Convoy From Europa',
  cost: 15,
  tags: ['space', 'event'],
  desc,
  flavor: 'Bringing ice and other key supplies from the Jovian moon Europa',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '📦',
  layout: (
    <div className="text-center">
      <div className="resources text-center">
        <Tile name="ocean" />
        <Param name="card back" />
      </div>
      <div className="description text-center m-bottom">{desc}</div>
    </div>
  )
});
