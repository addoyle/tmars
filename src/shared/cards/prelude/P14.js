import React from 'react';
import Prelude from '../Prelude';
import { Tile } from '../../../client/game/components/assets/Assets';

const desc = 'Place 2 ocean tiles.';

export default new Prelude({
  number: 'P14',
  title: 'Great Aquifer',
  tags: [],
  set: 'prelude',
  desc,
  flavor: 'You found a big one!',
  emoji: '🌊️',
  serverAction: (player, game) => {
    // TODO: Place 2 oceans
    game.param('ocean', player);
    game.param('ocean', player);
  },
  layout: (
    <div className="flex gutter">
      <div className="col-1 text-center middle">
        <div className="resources">
          <Tile name="ocean" />
          <Tile name="ocean" />
        </div>
      </div>
      <div className="col-2 description middle">{desc}</div>
    </div>
  )
});
