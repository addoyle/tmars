import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Effect: Your steel resources are worth 1 M€ extra.';

export default new Active({
  number: 'X10',
  title: 'Rego Plastics',
  cost: 10,
  tags: ['building'],
  set: 'promo',
  activeDesc,
  flavor: 'Silicon-based plastics for everyday use. Made from Martian regolith',
  action: player => player.rates.steel++,
  vp: 1,
  emoji: '♻',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Resource name="steel" />: <span>+</span>
        <MegaCredit value="1" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-1" />
      <div className="bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
