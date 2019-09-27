import React from 'react';
import Automated from '../../client/components/Automated';
import { Resource, Production, VictoryPoint } from '../../client/components/assets/Assets';

const desc = 'Increase your energy production 1 step.';

export default new Automated({
  number: 113,
  title: 'Solar Power',
  cost: 11,
  tags: ['power', 'building'],
  desc,
  flavor: '[TODO]',
  clientAction: game => {},
  serverAction: game => {},
  vp: 1,
  emoji: '☀',
  layout: (
    <div className="flex gutter">
      <div className="col-3 text-center">
        <Production>
          <div className="flex">
            <Resource name="power" />
          </div>
        </Production>
        <div className="description m-bottom">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
