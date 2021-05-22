import React from 'react';
import Event from '../Event';
import {
  Resource,
  Param,
  Tile
} from '../../../client/game/components/assets/Assets';

const desc =
  'Raise temperature 2 steps and place 2 ocean tiles. Remove up to 6 plants from any player.';

export default new Event({
  number: '080',
  title: 'Giant Ice Asteroid',
  cost: 36,
  tags: ['space', 'event'],
  desc,
  flavor: 'Crash it. The bigger, the better',
  action: (player, game, done) =>
    game.promptPlayer(
      player,
      'Pick a player to remove up to 6 plants',
      [p => ({ text: +p.resources.plant }), { resource: 'plant' }],
      ['took 6 plants ', { resource: 'plant' }, ' from'],
      targetPlayer => {
        targetPlayer && game.resources(targetPlayer, 'plant', -6);
        done();
      },
      player => player.resources.plant > 0,
      done
    ),
  tile: ['ocean', 'ocean'],
  param: ['temperature', 'temperature'],
  emoji: '☄',
  layout: (
    <div className="text-center">
      <div className="resources middle">
        <Param name="temperature" />
        <Param name="temperature" />
        <Tile name="ocean" />
        <Tile name="ocean" />
        &nbsp;<span>&ndash;6</span>
        <Resource name="plant" anyone />
      </div>
      <div className="description m-bottom">{desc}</div>
    </div>
  )
});
