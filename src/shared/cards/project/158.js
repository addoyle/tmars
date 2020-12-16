import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase your energy production and your steel production 1 step each.';

export default new Automated({
  number: 158,
  title: 'Industrial Microbes',
  cost: 12,
  tags: ['microbe', 'building'],
  desc,
  flavor:
    'Fuel production and metal refining can be programmed into microorganisms',
  action: (player, game) => {
    game.production(player, 'power', 1);
    game.production(player, 'steel', 1);
  },
  emoji: '🦠️',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="power" />
          </div>
          <div className="flex">
            <Resource name="steel" />
          </div>
        </Production>
      </div>
      <div className="col-3 description text-center middle">{desc}</div>
    </div>
  )
});
