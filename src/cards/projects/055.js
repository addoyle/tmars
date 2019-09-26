import React from 'react';
import Automated from '../../client/components/Automated';
import { Resource, Production, VictoryPoint, MegaCredit } from '../../client/components/assets/Assets';

const desc = 'Requires 6 ocean tiles. Increase your M€ production 2 steps and your plant production 3 steps. Gain 2 plants.';

export default new Automated({
  number: 55,
  title: 'Kelp Farming',
  cost: 17,
  tags: ['plant'],
  restriction: {
    value: 6,
    tile: 'ocean'
  },
  desc,
  flavor: 'The newly formed oceans are very rich in minerals, perfect for food production',
  clientAction: game => {},
  serverAction: game => {},
  vp: 1,
  emoji: '🌿',
  layout: (
    <div className="flex gutter">
      <div className="col-3 middle">
        <div className="flex gutter">
          <Production>
            <div className="flex">
              <Resource name="blank" />
              <MegaCredit value="2" />
              <Resource name="blank" />
            </div>
            <div className="flex">
              <Resource name="plant" />
              <Resource name="plant" />
              <Resource name="plant" />
            </div>
          </Production>
          <div className="resources">
            <Resource name="plant" />
            <Resource name="plant" />
          </div>
        </div>
        <div className="description text-center m-top">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
