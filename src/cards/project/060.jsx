import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  VictoryPoint
} from '../../client/game/components/assets/Assets';

const desc =
  'Requires -4°C or warmer. Increase your plant production 3 steps. Gain 1 plant.';

export default new Automated({
  number: 60,
  title: 'Trees',
  cost: 13,
  tags: ['plant'],
  restriction: {
    value: -4,
    param: 'temperature'
  },
  desc,
  flavor: 'Providing fruits, wood, and new habitats',
  clientAction: () => {},
  serverAction: () => {},
  vp: 1,
  emoji: '🌲',
  layout: (
    <div className="flex gutter">
      <div className="col-3 middle">
        <div className="flex gutter">
          <Production>
            <div className="flex">
              <Resource name="plant" />
              <Resource name="plant" />
              <Resource name="plant" />
            </div>
          </Production>
          <div className="resources">
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
