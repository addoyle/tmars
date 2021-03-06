import React from 'react';
import Automated from '../Automated';
import { Tile } from '../../../client/game/components/assets/Assets';

const desc =
  'Requires 2 science tags. Place a greenery tile and raise oxygen 1 step.';

export default new Automated({
  number: '193',
  title: 'Plantation',
  cost: 15,
  tags: ['plant'],
  restriction: {
    value: 2,
    tag: 'science'
  },
  desc,
  flavor:
    'By focusing on a limited area, helpful measures can be taken to improve local conditions for plant life',
  tile: 'greenery',
  emoji: '🌳',
  layout: (
    <div className="text-center">
      <div className="resources">
        <Tile name="greenery" />
      </div>
      <div className="description">{desc}</div>
    </div>
  )
});
