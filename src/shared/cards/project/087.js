import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires -16°C or warmer. Increase your plant production 1 step. Gain 3 plants.';

export default new Automated({
  number: '087',
  title: 'Grass',
  cost: 11,
  tags: ['plant'],
  restriction: {
    value: -16,
    param: 'temperature'
  },
  desc,
  flavor: 'Taking root in every crevice and patch of soil',
  action: (player, game) => {
    game.production(player, 'plant', 1);
    game.resources(player, 'plant', 3);
  },
  emoji: '🌱',
  layout: (
    <div className="m-bottom">
      <div className="flex gutter center">
        <Production>
          <div className="flex">
            <Resource name="plant" />
          </div>
        </Production>
        <div className="resources middle">
          <Resource name="plant" />
          <Resource name="plant" />
          <Resource name="plant" />
        </div>
      </div>
      <div className="description text-center m-top">{desc}</div>
    </div>
  )
});
