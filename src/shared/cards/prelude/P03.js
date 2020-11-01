import React from 'react';
import Prelude from '../Prelude';
import {
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase your plant production and energy production 1 step each. Gain 2 plants.';

export default new Prelude({
  number: 'P03',
  title: 'Biofuels',
  tags: ['microbe'],
  set: 'prelude',
  desc,
  flavor: 'Organic production of fuels and fertilizers',
  emoji: '💩',
  action: (player, game) => {
    game.resources(player, 'plant', 2);
    game.production(player, 'plant', 1);
    game.production(player, 'power', 1);
  },
  layout: (
    <div className="flex gutter">
      <div className="col-1 text-center middle">
        <Production>
          <div className="flex">
            <Resource name="plant" />
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-1 text-center middle">
        <div className="resources">
          <Resource name="plant" />
          <Resource name="plant" />
        </div>
      </div>
      <div className="description col-3 middle">{desc}</div>
    </div>
  )
});
