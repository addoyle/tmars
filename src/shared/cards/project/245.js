import React from 'react';
import Automated from '../Automated';
import {
  VictoryPoint,
  Param
} from '../../../client/game/components/assets/Assets';

const desc = 'Requires Venus, Earth, and Jovian tags. Draw 2 cards.';

export default new Automated({
  number: 245,
  title: 'Solarnet',
  cost: 7,
  tags: [],
  set: 'venus',
  restriction: {
    value: 1,
    tag: ['venus', 'earth', 'jovian']
  },
  desc,
  flavor: 'Connecting the planets to the Cloud',
  action: () => {},
  vp: 1,
  emoji: '💻',
  layout: (
    <div>
      <div className="flex gutter">
        <div className="text-center middle">
          <div className="resources">
            <Param name="card back" />
            <Param name="card back" />
          </div>
          <div className="description m-top">{desc}</div>
        </div>
        <div className="col-1 text-right bottom">
          <VictoryPoint>
            <span className="big point">1</span>
          </VictoryPoint>
        </div>
      </div>
    </div>
  )
});
