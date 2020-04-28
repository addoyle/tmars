import React from 'react';
import Active from '../Active';
import { Param, Resource } from '../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 4 energy to gain 1 titanium and increase oxygen 1 step.';

export default new Active({
  number: 104,
  title: 'Ore Processor',
  cost: 13,
  tags: ['building'],
  activeDesc,
  flavor: 'Processing ore',
  clientAction: () => {},
  serverAction: () => {},
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
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});
