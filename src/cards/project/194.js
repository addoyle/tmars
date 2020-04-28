import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit
} from '../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend any amount of energy to gain that amount of M€.';

export default new Active({
  number: 194,
  title: 'Power Infrastructure',
  cost: 4,
  tags: ['power', 'building'],
  set: 'corporate',
  activeDesc,
  flavor: 'Efficiency through flexibility',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🔌',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span>X</span>
        <Resource name="power" />
        <span className="arrow" />
        <MegaCredit value="X" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});
