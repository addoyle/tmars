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
  number: '010',
  title: 'Comet',
  cost: 21,
  tags: ['space', 'event'],
  desc,
  flavor: 'Prepare to be cratered!',
  action: (player, game, done) => {
    game.promptPlayer(
      player,
      'Pick a player to remove up to 3 plants',
      [p => ({ text: +p.resources.plant }), { resource: 'plant' }],
      ['took 3 plants ', { resource: 'plant' }, ' from'],
      targetPlayer => {
        targetPlayer && game.resources(targetPlayer, 'plant', -3);
        done();
      },
      player => player.resources.plant > 0,
      done
    );
  },
  param: ['temperature'],
  tile: 'ocean',
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
