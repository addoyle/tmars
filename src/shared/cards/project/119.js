import React from 'react';
import Automated from '../Automated';
import { VictoryPoint } from '../../../client/game/components/assets/Assets';

const desc = 'Requires 3 or less ocean tiles.';

export default new Automated({
  number: 119,
  title: 'Dust Seals',
  cost: 2,
  tags: [],
  restriction: {
    max: true,
    value: 3,
    tile: 'ocean'
  },
  desc,
  flavor:
    'Tight seals to keep micron-sized dust out of buildings, vehicles and suits',
  vp: 1,
  emoji: '🗜️',
  layout: (
    <div className="flex gutter">
      <div className="description text-center middle col-3">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
