import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  Tag
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires 4% oxygen. Increase your plant production 1 step for every 2 microbe tags you have, including this.';

export default new Automated({
  number: 130,
  title: 'Worms',
  cost: 8,
  tags: ['microbe'],
  restriction: {
    value: 4,
    param: 'oxygen'
  },
  desc,
  flavor: 'Milling about in the soil, ‘processing’ it',
  action: (player, game) =>
    game.production(player, 'plant', Math.floor(player.tags.microbe / 2)),
  emoji: '🐛',
  layout: (
    <div className="text-center">
      <Production>
        <div className="flex">
          <Resource name="plant" />
          <div>
            /<span>2</span>
          </div>
          <Tag name="microbe" />
        </div>
      </Production>
      <div className="description m-top">{desc}</div>
    </div>
  )
});
