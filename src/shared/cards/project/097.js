import React from 'react';
import Automated from '../Automated';
import {
  Tile,
  Param,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc = 'Place this tile and raise temperature 2 steps.';

export default new Automated({
  number: '097',
  title: 'Nuclear Zone',
  cost: 10,
  tags: ['earth'],
  desc,
  flavor:
    'Detonating obsolete nuclear weapons from Earth is an efficient method for raising the temperature',
  tile: {
    special: 'nuclear'
  },
  param: ['temperature', 'temperature'],
  vp: -2,
  emoji: '☢',
  layout: (
    <div className="flex gutter">
      <div className="col-3 text-center">
        <div className="resources">
          <Tile name="special" icon="nuclear" />
          <Param name="temperature" />
          <Param name="temperature" />
        </div>
        <div className="description">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">-2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
