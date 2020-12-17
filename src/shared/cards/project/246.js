import React from 'react';
import Event from '../Event';
import { Param } from '../../../client/game/components/assets/Assets';

const desc = 'Venus must be 10% or lower. Raise Venus 2 steps.';

export default new Event({
  number: 246,
  title: 'Spin-Inducing Asteroid',
  cost: 16,
  tags: ['space', 'event'],
  set: 'venus',
  restriction: {
    value: 10,
    param: 'venus',
    max: true
  },
  desc,
  flavor:
    'Smash a heavy asteroid at a slanting angle to increase Venus’ rotation, reducing day length',
  action: (player, game, done) =>
    game.param(player, 'venus', () => game.param(player, 'venus', done)),
  emoji: '☄',
  layout: (
    <div className="text-center">
      <div className="resources">
        <Param name="venus" />
        <Param name="venus" />
      </div>
      <div className="description m-top m-bottom">{desc}</div>
    </div>
  )
});
