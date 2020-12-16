import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your power production 1 step.';

export default new Automated({
  number: 141,
  title: 'Power Plant',
  cost: 4,
  tags: ['power', 'building'],
  desc,
  flavor: 'Standard equipment, normal output',
  action: (player, game) => game.production(player, 'power', 1),
  emoji: '🏭',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-3 description text-center middle">{desc}</div>
    </div>
  )
});
