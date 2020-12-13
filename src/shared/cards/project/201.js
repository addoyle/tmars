import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease any energy production 1 step and increase your own 1 step.';

export default new Automated({
  number: 201,
  title: 'Energy Tapping',
  cost: 3,
  tags: ['power'],
  set: 'corporate',
  desc,
  flavor: 'They need it. But we need it more',
  action: () => {},
  vp: -1,
  emoji: '🔌',
  todo: true,
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" anyone />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-2 middle text-center description">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">-1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
