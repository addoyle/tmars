import React from 'react';
import Active from '../../client/components/Active';
import { Resource } from '../../client/components/assets/Assets';

const top_desc = 'OPPONENTS MAY NOT REMOVE YOUR';

export default new Active({
  number: 173,
  title: 'Protected Habitats',
  cost: 5,
  tags: [],
  set: 'corporate',
  top_desc,
  flavor: 'The harsh environment is not the only threat to your ecological projects',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🏜',
  activeLayout: (
    <div className="text-center">
      <div className="strong sans-serif m-top">{top_desc}</div>
      <div className="resources">
        <Resource name="plant" />
        <Resource name="animal" />
        <Resource name="microbe" />
      </div>
    </div>
  ),
  layout: (
    <div />
  )
});
