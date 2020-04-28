import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  VictoryPoint
} from '../../client/game/components/assets/Assets';

const desc = 'Requires 4 ocean tiles. Increase your energy production 2 steps.';

export default new Automated({
  number: 136,
  title: 'Great Dam',
  cost: 12,
  tags: ['power', 'building'],
  restriction: {
    value: 4,
    tile: 'ocean'
  },
  desc,
  flavor: 'Letting natural processes do the work',
  clientAction: () => {},
  serverAction: () => {},
  vp: 1,
  emoji: '🌊',
  layout: (
    <div className="flex gutter">
      <div className="col-3 text-center">
        <Production>
          <div className="flex">
            <Resource name="power" />
            <Resource name="power" />
          </div>
        </Production>
        <div className="description">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
