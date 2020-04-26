import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  Tile,
  Production,
  MegaCredit,
  VictoryPoint
} from '../../client/game/components/assets/Assets';

const desc =
  'Oxygen must be 7% or less. Gain 3 plants and place a city tile. Decrease your energy production 1 step and increase M€ production 3 steps.';

export default new Automated({
  number: 16,
  title: 'Domed Crater',
  cost: 24,
  tags: ['city', 'building'],
  restriction: {
    max: true,
    value: 7,
    param: 'oxygen'
  },
  desc,
  flavor: 'A spacious area for a great city',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🕌',
  vp: 1,
  layout: (
    <div>
      <div className="flex gutter">
        <div className="col-3 middle">
          <div className="resources">
            <Resource name="plant" />
            <Resource name="plant" />
            <Resource name="plant" />
          </div>
        </div>
        <div className="col-4 middle">
          <div className="resources">
            <Tile name="city" />
          </div>
        </div>
      </div>
      <div className="flex gutter">
        <div className="col-1">
          <Production>
            <div className="flex">
              <div className="col-1">&ndash;</div>
              <Resource name="power" />
            </div>
            <div className="flex">
              <div className="col-1">+</div>
              <MegaCredit value="3" />
            </div>
          </Production>
        </div>
        <div className="col-2">{desc}</div>
        <div className="col-1 bottom">
          <VictoryPoint>
            <span className="point big">1</span>
          </VictoryPoint>
        </div>
      </div>
    </div>
  )
});
