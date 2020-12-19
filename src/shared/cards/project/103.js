import React from 'react';
import Active from '../Active';
import { Param, Resource } from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 4 energy to gain 2 steel and increase oxygen 1 step.';

export default new Active({
  number: '103',
  title: 'Steelworks',
  cost: 15,
  tags: ['building'],
  activeDesc,
  flavor:
    'Turning the soil into steel and oxygen sounds good. It just takes a lot of energy',
  emoji: '🛠',
  todo: true,
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span>4</span>
        <Resource name="power" />
        <span className="arrow" />
        <Resource name="steel" />
        <Resource name="steel" />
        <Param name="oxygen" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});
