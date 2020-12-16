import React from 'react';
import Event from '../Event';
import { Tile } from '../../../client/game/components/assets/Assets';

const desc = 'Requires +2°C or warmer. Place 1 ocean tile.';

export default new Event({
  number: 181,
  title: 'Ice Cap Melting',
  cost: 5,
  tags: ['event'],
  restriction: {
    value: 2,
    param: 'temperature'
  },
  desc,
  flavor: 'Getting the water back from the poles',
  action: (player, game, done) => game.promptTile(player, 'ocean', done),
  emoji: '☃️',
  layout: (
    <div className="text-center">
      <div className="resources">
        <Tile name="ocean" />
      </div>
      <div className="description">{desc}</div>
    </div>
  )
});
