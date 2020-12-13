import React from 'react';
import Active from '../Active';
import {
  Tile,
  VictoryPoint,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

// TODO ACTION

const activeDesc = 'Effect: When any city tile is placed, gain 2 M€';

export default new Active({
  number: 38,
  title: 'Rover Construction',
  cost: 8,
  tags: ['building'],
  activeDesc,
  flavor: 'Providing safe transport vehicles',
  action: () => {},
  vp: 1,
  emoji: '🚙',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Tile name="city" anyone />:
        <MegaCredit value="2" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-3" />
      <div className="col-1">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
