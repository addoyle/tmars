import React from 'react';
import Automated from '../Automated';
import { VictoryPoint } from '../../../client/game/components/assets/Assets';

const desc = 'Requires a plant tag, a microbe tag, and an animal tag.';

export default new Automated({
  number: '135',
  title: 'Advanced Ecosystems',
  cost: 11,
  tags: ['plant', 'microbe', 'animal'],
  restriction: {
    value: 1,
    tag: ['plant', 'microbe', 'animal']
  },
  desc,
  flavor:
    'Constructing functional, dynamic ecosystems requires many ingredients',
  vp: 3,
  emoji: '🏞',
  layout: (
    <div className="flex gutter">
      <div className="description text-center middle col-3">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">3</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
