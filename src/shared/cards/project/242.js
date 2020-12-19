import React from 'react';
import Automated from '../Automated';
import {
  Param,
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'Raise Venus 2 steps. Increase your heat production 2 steps.';

export default new Automated({
  number: '242',
  title: 'Orbital Reflectors',
  cost: 26,
  tags: ['venus', 'space'],
  set: 'venus',
  desc,
  flavor: 'Dual terraforming by redirecting sunlight from Venus to Mars',
  action: (player, game, done) => {
    game.production(player, 'heat', 2);
    game.param(player, 'venus', () => game.param(player, 'venus', done));
  },
  emoji: '🪞',
  layout: (
    <div>
      <div className="flex gutter">
        <div className="col-1 resources middle text-center">
          <Param name="venus" />
          <Param name="venus" />
        </div>
        <div className="col-1 middle">
          <Production>
            <div className="flex">
              <Resource name="heat" />
              <Resource name="heat" />
            </div>
          </Production>
        </div>
      </div>
      <div className="description text-center">{desc}</div>
    </div>
  )
});
