import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'Requires Venus 8%. Increase your titanium production 1 step.';

export default new Automated({
  number: 233,
  title: 'Ishtar Mining',
  cost: 5,
  tags: ['venus'],
  set: 'venus',
  restriction: {
    value: 8,
    param: 'venus'
  },
  desc,
  flavor:
    'The mountains on Venus’ nothern continent are full of interesting metals',
  action: (player, game) => game.production(player, 'titanium', 1),
  emoji: '⛏',
  layout: (
    <div className="flex gutter">
      <div className="text-center middle">
        <Production>
          <div className="flex">
            <Resource name="titanium" />
          </div>
        </Production>
      </div>
      <div className="description middle">{desc}</div>
    </div>
  )
});
