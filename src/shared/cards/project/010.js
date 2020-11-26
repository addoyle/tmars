import React from 'react';
import Event from '../Event';
import {
  Resource,
  Param,
  Tile
} from '../../../client/game/components/assets/Assets';

const desc =
  'Raise temperature 1 step and place an ocean tile. Remove up to 3 plants from any player.';

export default new Event({
  number: 10,
  title: 'Comet',
  cost: 21,
  tags: ['space', 'event'],
  desc,
  flavor: 'Prepare to be cratered!',
  action: (player, game, done) => {
    game.param('temperature', player);
    game.promptTile('ocean', player, () =>
      game.promptPlayer(
        targetPlayer => game.resources(targetPlayer, 'plant', -3),
        done
      )
    );
  },
  emoji: '☄',
  layout: (
    <div className="flex gutter m-top m-bottom">
      <div className="col-1">
        <div className="resources">
          +<Param name="temperature" />
          <Tile name="ocean" />
        </div>
        <div className="resources">
          &ndash;
          <Resource name="plant" anyone />
          <Resource name="plant" anyone />
          <Resource name="plant" anyone />
        </div>
      </div>
      <div className="description col-1 middle">{desc}</div>
    </div>
  )
});
