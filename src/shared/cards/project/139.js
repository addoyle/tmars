import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc = 'Requires 3 ocean tiles. Increase your energy production 1 step.';

export default new Automated({
  number: 139,
  title: 'Wave Power',
  cost: 8,
  tags: ['power'],
  restriction: {
    value: 3,
    tile: 'ocean'
  },
  desc,
  flavor: 'Well, see, first you need some waves...',
  action: () => {},
  vp: 1,
  emoji: '🌊',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-3 description middle">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
