import React from 'react';
import Prelude from '../Prelude';
import {
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your energy production 3 steps.';

export default new Prelude({
  number: 'P27',
  title: 'Power Generation',
  tags: ['power'],
  set: 'prelude',
  desc,
  flavor: 'A solid base for your energy needs',
  emoji: '🔌',
  action: (player, game) => {
    game.production(player, 'power', 3);
  },
  layout: (
    <div className="flex gutter">
      <div className="col-2 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="power" />
            <Resource name="power" />
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="description col-3 middle">{desc}</div>
    </div>
  )
});
