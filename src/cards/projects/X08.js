import React from 'react';
import Active from '../../client/components/Active';
import { Tag, MegaCredit, Production, VictoryPoint } from '../../client/components/assets/Assets';

const top_desc = 'Action: Gain 1 M€ per science tag you have.';
const desc = 'Decrease your M€ production 2 steps.';

export default new Active({
  number: 'X08',
  title: 'Orbital Cleanup',
  cost: 14,
  tags: ['earth', 'space'],
  set: 'promo',
  top_desc,
  desc,
  flavor: 'Debris in low Earth orbit is a steadily growing hazard for space traffic',
  clientAction: game => {},
  serverAction: game => {},
  vp: 2,
  emoji: '🛰',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <MegaCredit value="1" />/<Tag name="science" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <MegaCredit value="-2" />
          </div>
        </Production>
      </div>
      <div className="col-3 description middle text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});