import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease any heat production 2 steps and increase your energy production 1 step.';

export default new Automated({
  number: 178,
  title: 'Heat Trappers',
  cost: 6,
  tags: ['power', 'building'],
  desc,
  flavor: 'Utilizing temperature gradients for energy production',
  clientAction: () => {},
  serverAction: () => {},
  vp: -1,
  emoji: '🔥',
  layout: (
    <div className="flex gutter">
      <div className="col-3 middle text-center">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="heat" anyone />
            <Resource name="heat" anyone />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="power" />
            <Resource name="blank" />
          </div>
        </Production>
        <div className="description">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">-1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
