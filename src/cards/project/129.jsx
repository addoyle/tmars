import React from 'react';
import Automated from '../Automated';
import {
  Production,
  MegaCredit,
  Tile,
  VictoryPoint
} from '../../client/game/components/assets/Assets';

const desc =
  'Requires 5% oxygen. Increase your M€ production 1 step for each city tile ON MARS.';

export default new Automated({
  number: 129,
  title: 'Zeppelins',
  cost: 13,
  tags: [],
  restriction: {
    value: 5,
    param: 'oxygen'
  },
  desc,
  flavor: 'A relatively cheap way to travel between cities across the planet',
  clientAction: () => {},
  serverAction: () => {},
  vp: 1,
  emoji: '🎈',
  layout: (
    <div className="flex gutter">
      <div className="col-3 text-center">
        <Production>
          <div className="flex">
            <MegaCredit value="1" />
            <div>/</div>
            <Tile name="city" anyone asterisk />
          </div>
        </Production>
        <div className="description m-top">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
