import React from 'react';
import Event from '../Event';
import { Resource, Param } from '../../../client/game/components/assets/Assets';

const desc =
  'Raise temperature 1 step and gain 2 titanium. Remove up to 3 plants from any player.';

export default new Event({
  number: 9,
  title: 'Asteroid',
  cost: 14,
  tags: ['space', 'event'],
  desc,
  flavor: 'What are those plants in our impact zone?',
  action: (player, game, done) => {
    game.param('temperature', player);
    game.resources(player, 'titanium', 2);
    game.promptPlayer(
      targetPlayer => game.resources(targetPlayer, 'plant', -3),
      done
    );
  },
  emoji: '☄',
  layout: (
    <div className="flex gutter m-top m-bottom">
      <div className="col-1">
        <div className="resources">
          +<Param name="temperature" />
          <Resource name="titanium" />
          <Resource name="titanium" />
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
