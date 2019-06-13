import React from 'react';
import Event from '../../client/components/Event';
import { Resource, Tile } from '../../client/components/assets/Assets';

const desc = 'Gain 3 plants, or add 3 microbes or 2 animals to ANOTHER card. Place an ocean tile.';

export default new Event({
  number: 19,
  title: 'Imported Hydrogen',
  cost: 16,
  tags: ['earth', 'space', 'event'],
  desc,
  flavor: 'A light-weight but expensive crucial element',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🎈',
  layout: (
    <div>
      <div className="resources text-center">
        <span>3</span>
        <Resource name="plant" />
        <span>OR 3</span>
        <Resource name="microbe" />*
        <span>OR 2</span>
        <Resource name="animal" />*
      </div>
      <div className="flex gutter">
        <div className="col-1 resources">
          <Tile name="ocean" />
        </div>
        <div className="col-5 description middle">{desc}</div>
      </div>
    </div>
  )
});
