import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'It must be -14°C or colder. Increase your plant production 2 steps.';

export default new Automated({
  number: '155',
  title: 'Designed Microorganisms',
  cost: 16,
  tags: ['science', 'microbe'],
  restriction: {
    max: true,
    value: -14,
    param: 'temperature'
  },
  desc,
  flavor: 'Specializing in extremely cold conditions',
  action: (player, game) => game.production(player, 'plant', 2),
  emoji: '🦠',
  layout: (
    <div className="text-center">
      <Production>
        <div className="flex">
          <Resource name="plant" />
          <Resource name="plant" />
        </div>
      </Production>
      <div className="description m-bottom">{desc}</div>
    </div>
  )
});
