import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires Venus, Earth, and Jovian tags. Increase your steel production 2 steps.';

export default new Automated({
  number: 239,
  title: 'Mining Quota',
  cost: 5,
  tags: ['building'],
  set: 'venus',
  restriction: {
    value: 1,
    tag: ['venus', 'earth', 'jovian']
  },
  desc,
  flavor: 'Your wide-spread influence results in a World Government contract',
  action: (player, game) => game.production(player, 'steel', 2),
  emoji: '⚖',
  layout: (
    <div>
      <div className="text-center">
        <Production>
          <div className="flex">
            <Resource name="steel" />
            <Resource name="steel" />
          </div>
        </Production>
      </div>
      <div className="description text-center">{desc}</div>
    </div>
  )
});
