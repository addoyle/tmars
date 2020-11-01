import React from 'react';
import Automated from '../Automated';
import { VictoryPoint } from '../../../client/game/components/assets/Assets';

const desc = 'Requires Venus, Earth, and Jovian tags.';

export default new Automated({
  number: 237,
  title: 'Luxury Foods',
  cost: 8,
  tags: [],
  set: 'venus',
  restriction: {
    value: 1,
    tag: ['venus', 'earth', 'jovian']
  },
  desc,
  flavor: 'Have you tried the Venusian sulphur salmon?',
  action: () => {},
  vp: 2,
  emoji: '🥓',
  layout: (
    <div className="flex gutter">
      <div className="col-4 description middle text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
