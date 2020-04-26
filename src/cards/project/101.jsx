import React from 'react';
import Active from '../Active';
import { Param, Resource } from '../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 4 energy to gain 1 steel and increase oxygen 1 step.';

export default new Active({
  number: 101,
  title: 'Ironworks',
  cost: 11,
  tags: ['building'],
  activeDesc,
  flavor:
    'Electrolysis of Martian soil yields both iron and oxygen, making it an important part of terraforming',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '⚒',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span>4</span>
        <Resource name="power" />
        <span className="arrow" />
        <Resource name="steel" />
        <Param name="oxygen" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});
