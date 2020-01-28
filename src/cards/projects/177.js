import React from 'react';
import Active from '../../client/components/cards/Active';
import { Resource, Param } from '../../client/components/assets/Assets';

const top_desc = 'Action: Spend 3 energy to raise oxygen 1 step.';
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
  top_desc,
  desc,
  flavor: 'Electrolysis of water yields oxygen and hydrogen, both very useful gases',
  clientAction: game => {},
  serverAction: game => {},
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
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="description text-center m-bottom">{desc}</div>
  )
});
