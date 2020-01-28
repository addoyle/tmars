import React from 'react';
import Active from '../../client/components/cards/Active';
import { Resource, Production, VictoryPoint, MegaCredit } from '../../client/components/assets/Assets';

const top_desc = 'Action: Spend 1 plant or 1 steel to gain 7 M€.';
const desc = 'Oxygen must be 8% or less. Decrease your energy production 1 step.';

export default new Active({
  number: 69,
  title: 'Electro Catapult',
  cost: 17,
  tags: ['building'],
  set: 'corporate',
  restriction: {
    max: true,
    value: 8,
    param: 'oxygen'
  },
  top_desc,
  desc,
  flavor: 'A 200 km long acceleration ramp up the side of Pavonis Mons, hurtling export goods into space',
  clientAction: game => {},
  serverAction: game => {},
  vp: 1,
  emoji: '🏸',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Resource name="plant" />
        /
        <Resource name="steel" />
        <span className="arrow" />
        <MegaCredit value="7" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <div>&ndash;</div>
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-3 middle description">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
