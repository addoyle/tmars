import React from 'react';
import Active from '../../client/components/Active';
import { Resource, MegaCredit } from '../../client/components/assets/Assets';

const top_desc = 'Action: Spend any amount of energy to gain that amount of M€.';

export default new Active({
  number: 194,
  title: 'Power Infrastructure',
  cost: 4,
  tags: ['power', 'building'],
  set: 'corporate',
  top_desc,
  flavor: 'Efficiency through flexibility',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🔌',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span>X</span>
        <Resource name="power" />
        <span className="arrow" />
        <MegaCredit value="X" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div />
  )
});
