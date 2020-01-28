import React from 'react';
import Active from '../../client/components/cards/Active';
import { Param, Resource } from '../../client/components/assets/Assets';

const top_desc = 'Action: Spend 4 energy to gain 1 titanium and increase oxygen 1 step.';

export default new Active({
  number: 104,
  title: 'Ore Processor',
  cost: 13,
  tags: ['building'],
  top_desc,
  flavor: 'Processing ore',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '⛏',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span>4</span>
        <Resource name="power" />
        <span className="arrow" />
        <Resource name="titanium" />
        <Param name="oxygen" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div />
  )
});
