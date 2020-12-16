import React from 'react';
import Event from '../Event';
import { Tile } from '../../../client/game/components/assets/Assets';

const desc = 'Place 1 ocean tile.';

export default new Event({
  number: 127,
  title: 'Subterranean Reservoir',
  cost: 11,
  tags: ['event'],
  desc,
  flavor:
    "Also known as an aquifer. Burst one open and you've got a lot of water",
  action: (player, game, done) => game.promptTile(player, 'ocean', done),
  emoji: '🌊',
  layout: (
    <div className="text-center">
      <div className="resources">
        <Tile name="ocean" />
      </div>
      <div className="description text-center m-bottom">{desc}</div>
    </div>
  )
});
