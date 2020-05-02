import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc = 'Requires 7% oxygen. Increase your energy production 1 step.';

export default new Automated({
  number: 168,
  title: 'Windmills',
  cost: 6,
  tags: ['power', 'building'],
  set: 'corporate',
  restriction: {
    value: 7,
    param: 'oxygen'
  },
  desc,
  flavor: 'At last we have more useful winds',
  clientAction: () => {},
  serverAction: () => {},
  vp: 1,
  emoji: '🌬',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-2 description middle">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
