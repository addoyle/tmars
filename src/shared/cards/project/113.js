import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  Production,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your energy production 1 step.';

export default new Automated({
  number: 113,
  title: 'Solar Power',
  cost: 11,
  tags: ['power', 'building'],
  desc,
  flavor: 'Perhaps the most readily available energy source on Mars',
  action: () => {},
  vp: 1,
  emoji: '☀',
  todo: true,
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-3 text-center description middle">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
