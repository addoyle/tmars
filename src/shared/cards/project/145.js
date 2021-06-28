import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires 2 science tags. Increase your energy production 3 steps.';

export default new Automated({
  number: '145',
  title: 'Tectonic Stress Power',
  cost: 18,
  tags: ['power', 'building'],
  restriction: {
    value: 2,
    tag: 'science'
  },
  desc,
  flavor:
    'After finding ways to predict earthquakes, it was only a matter of time before it became feasible to exploit the enormous energies involved',
  production: {
    power: 3
  },
  vp: 1,
  emoji: '😱',
  layout: (
    <div className="flex gutter">
      <div className="col-3 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="power" />
            <Resource name="power" />
            <Resource name="power" />
          </div>
        </Production>
        <div className="description">{desc}</div>
      </div>
      <div className="col-1 middle bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
