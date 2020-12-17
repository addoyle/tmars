import React from 'react';
import Event from '../Event';
import { Param } from '../../../client/game/components/assets/Assets';

const desc = 'Raise Venus 1 step.';

export default new Event({
  number: 254,
  title: 'Water to Venus',
  cost: 9,
  tags: ['space', 'event'],
  set: 'venus',
  desc,
  flavor: 'There is some in the atmosphere, but not nearly enough',
  action: (player, game, done) => game.param(player, 'venus', done),
  emoji: '🚒',
  layout: (
    <div className="text-center">
      <div className="resources">
        <Param name="venus" />
      </div>
      <div className="description m-top m-bottom">{desc}</div>
    </div>
  )
});
