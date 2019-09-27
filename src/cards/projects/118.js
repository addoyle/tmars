import React from 'react';
import Automated from '../../client/components/Automated';
import { Production, MegaCredit, Resource, VictoryPoint } from '../../client/components/assets/Assets';

const desc = 'Requires +4°C or warmer. Increase your M€ production 2 steps and your plant production 2 steps. Gain 2 plants.';

export default new Automated({
  number: 118,
  title: 'Farming',
  cost: 16,
  tags: ['plant'],
  restriction: {
    value: 4,
    param: 'temperature'
  },
  desc,
  flavor: 'At least we can have a decent food production allowing for rapid population increase',
  clientAction: game => {},
  serverAction: game => {},
  vp: 2,
  emoji: '🚜',
  layout: (
    <div>
      <div className="flex gutter center">
        <div className="col-1 text-center">
          <Production>
            <div className="flex">
              <MegaCredit value="2" />
              <Resource name="blank" />
            </div>
            <div className="flex">
              <Resource name="plant" />
              <Resource name="plant" />
            </div>
          </Production>
        </div>
        <div className="resources col-2 middle">
          <Resource name="plant" />
          <Resource name="plant" />
        </div>
      </div>
      <div className="flex gutter">
        <div className="description text-center m-top col-3">{desc}</div>
        <div className="col-1 bottom">
          <VictoryPoint>
            <span className="big point">2</span>
          </VictoryPoint>
        </div>
      </div>
    </div>
  )
});
