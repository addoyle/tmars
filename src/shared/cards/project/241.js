import React from 'react';
import Automated from '../Automated';
import { Resource } from '../../../client/game/components/assets/Assets';

const desc =
  'Requires Venus, Earth, and Jovian tags. Increase your TR 2 steps.';

export default new Automated({
  number: 241,
  title: 'Omnicourt',
  cost: 11,
  tags: ['building'],
  set: 'venus',
  restriction: {
    value: 1,
    tag: ['venus', 'earth', 'jovian']
  },
  desc,
  flavor: 'Constructing the corridors of power',
  action: (player, game) => game.tr(player, 2),
  emoji: '🏛',
  layout: (
    <div>
      <div className="resources text-center">
        <Resource name="tr" />
        <Resource name="tr" />
      </div>
      <div className="description text-center">{desc}</div>
    </div>
  )
});
