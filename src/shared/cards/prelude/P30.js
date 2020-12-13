import React from 'react';
import Prelude from '../Prelude';
import { Resource, Param } from '../../../client/game/components/assets/Assets';

const desc = 'Raise oxygen 2 steps. Gain 5 steel.';

export default new Prelude({
  number: 'P30',
  title: 'Smelting Plant',
  tags: ['building'],
  set: 'prelude',
  desc,
  flavor: 'A prototype facility for elctrolyzing regolith into oxygen and iron',
  emoji: '🏭',
  action: (player, game, done) => {
    game.resources(player, 'steel', 5);
    game.param(player, 'oxygen', () => game.param(player, 'oxygen', done));
  },
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <div className="resources">
          <Param name="oxygen" />
          <Param name="oxygen" />
          <span>5</span>
          <Resource name="steel" />
        </div>
      </div>
      <div className="description col-1 middle">{desc}</div>
    </div>
  )
});
