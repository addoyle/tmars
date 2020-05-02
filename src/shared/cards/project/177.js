import React from 'react';
import Active from '../Active';
import { Resource, Param } from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Spend 3 energy to raise oxygen 1 step.';
const desc = 'Requires 2 ocean tiles.';

export default new Active({
  number: 177,
  title: 'Water Splitting Plant',
  cost: 12,
  tags: ['building'],
  restriction: {
    value: 2,
    tile: 'ocean'
  },
  activeDesc,
  desc,
  flavor:
    'Electrolysis of water yields oxygen and hydrogen, both very useful gases',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '💦',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Resource name="power" />
        <Resource name="power" />
        <Resource name="power" />
        <span className="arrow" />
        <Param name="oxygen" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div className="description text-center m-bottom">{desc}</div>
});
