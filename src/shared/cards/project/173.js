import React from 'react';
import Active from '../Active';
import { Resource } from '../../../client/game/components/assets/Assets';

const activeDesc = 'OPPONENTS MAY NOT REMOVE YOUR';

export default new Active({
  number: '173',
  title: 'Protected Habitats',
  cost: 5,
  tags: [],
  set: 'corporate',
  activeDesc,
  flavor:
    'The harsh environment is not the only threat to your ecological projects',
  action: () => {},
  emoji: '🏜',
  todo: true,
  activeLayout: (
    <div className="text-center">
      <div className="strong sans-serif m-top">{activeDesc}</div>
      <div className="resources">
        <Resource name="plant" />
        <Resource name="animal" />
        <Resource name="microbe" />
      </div>
    </div>
  ),
  layout: <div />
});
