import React from 'react';
import Event from '../Event';
import { Resource, Param } from '../../../client/game/components/assets/Assets';

// DONE

const desc =
  'Raise temperature 2 steps and gain 4 titanium. Remove up to 4 plants from any player.';

export default new Event({
  number: 11,
  type: 'event',
  title: 'Big Asteroid',
  cost: 27,
  tags: ['space', 'event'],
  desc,
  flavor: 'There are many unpopulated areas to crash it in',
  action: (player, game, done) => {
    game.resources(player, 'titanium', 4);
    game.param(player, 'temperature', () =>
      game.param(player, 'temperature', () =>
        game.promptPlayer(
          player,
          { resources: 'plant' },
          ['took 4 plants ', { resource: 'plant' }, ' from'],
          targetPlayer => {
            targetPlayer && game.resources(targetPlayer, 'plant', -4);
            done();
          }
        )
      )
    );
  },
  emoji: '☄',
  layout: (
    <div className="flex gutter m-top m-bottom">
      <div className="col-2">
        <div className="resources">
          +<Param name="temperature" />
          <Param name="temperature" />
        </div>
        <div className="resources">
          4<Resource name="plant" anyone />
        </div>
      </div>
      <div className="col-5">
        <div className="resources">
          <Resource name="titanium" />
          <Resource name="titanium" />
          <Resource name="titanium" />
          <Resource name="titanium" />
        </div>
        <div className="description">{desc}</div>
      </div>
    </div>
  )
});
