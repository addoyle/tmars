import React from 'react';
import Active from '../Active';
import {
  Resource,
  VictoryPoint,
  Production,
  Tile
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Add 1 resource to ANOTHER VENUS CARD.';
const desc =
  'Requires Venus 12%. Decrease your energy production 1 step. Place a city tile ON THE RESERVED AREA.';

export default new Active({
  number: 238,
  title: 'Maxwell Base',
  cost: 18,
  tags: ['venus', 'city'],
  set: 'venus',
  restriction: {
    value: 12,
    param: 'venus'
  },
  activeDesc,
  desc,
  flavor:
    'A much needed base of operations in the high mountains of the Ishtar continent',
  clientAction: () => {},
  serverAction: () => {},
  vp: 3,
  emoji: '🌆',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Resource name="any" tag="venus" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="middle">
        <Production>
          <div className="flex">
            <div>&ndash;</div>
            <Resource name="power" />
          </div>
        </Production>
        <div className="resources">
          <Tile name="city" asterisk />
        </div>
      </div>
      <div className="description middle">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">3</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
