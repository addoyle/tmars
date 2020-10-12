import React from 'react';
import Prelude from '../Prelude';
import {
  Resource,
  Production,
  Tile
} from '../../../client/game/components/assets/Assets';

const desc = 'Place 1 ocean tile. Increase your heat production 2 steps.';

export default new Prelude({
  number: 'P26',
  title: 'Polar Industries',
  tags: ['building'],
  set: 'prelude',
  desc,
  flavor:
    'The poles of Mars have an abundance of both water and carbon dioxide, ready for the taking',
  emoji: '💈',
  serverAction: (player, game, postAction) => {
    player.production.heat += 2;
    game.promptTile('ocean', player, postAction);
  },
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <div className="resources">
          <Tile name="ocean" />
        </div>
      </div>
      <div className="col-2 middle">
        <Production>
          <div className="flex">
            <Resource name="heat" />
            <Resource name="heat" />
          </div>
        </Production>
      </div>
      <div className="description col-3 middle">{desc}</div>
    </div>
  )
});
