import React from 'react';
import Active from '../../client/components/Active';
import { Resource, MegaCredit } from '../../client/components/assets/Assets';

const top_desc = 'Effect: Each time a city tile is placed, including this, increase your M€ production 1 step.';
const desc = 'Decrease your energy production 1 step and decrease your M€ production 2 steps. Place a city tile.';

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
