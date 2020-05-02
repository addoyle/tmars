import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  MegaCredit,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires -6°C or warmer. Increase your plant production 1 step and your M€ production 2 steps.';

export default new Automated({
  number: 169,
  title: 'Tundra Farming',
  cost: 16,
  tags: ['plant'],
  restriction: {
    value: -6,
    param: 'temperature'
  },
  desc,
  flavor: 'Farming the thawed soil over the frozen bedrock',
  clientAction: () => {},
  serverAction: () => {},
  vp: 2,
  emoji: '🚜',
  layout: (
    <div className="flex gutter">
      <div className="col-3 middle text-center">
        <div className="flex gutter center">
          <Production>
            <div className="flex">
              <Resource name="plant" />
              <MegaCredit value="2" />
            </div>
          </Production>
          <div className="resources middle text-center">
            <Resource name="plant" />
          </div>
        </div>
        <div className="description m-top">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
