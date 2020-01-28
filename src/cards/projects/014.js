import React from 'react';
import Active from '../../client/components/cards/Active';
import { Resource, Param } from '../../client/components/assets/Assets';

const top_desc = 'Action: Spend 1 energy to draw a card.';

export default new Active({
  number: 14,
  title: 'Development Center',
  cost: 11,
  tags: ['science', 'building'],
  set: 'corporate',
  top_desc,
  flavor: 'Ensuring a constant influx of ideas',
  clientAction: game => {},
  serverAction: game => {},
  clientActiveAction: game => {},
  serverActiveAction: game => {},
  vp: game => {},
  emoji: '🏢',
  activeLayout: (
    <div>
      <div className="center text-center">
        <div className="resources">
          <Resource name="power" />
          <span className="arrow" />
          <Param name="card back" />
        </div>
        <div className="description text-center">{top_desc}</div>
      </div>
    </div>
  ),
  layout: (
    <div className="m-top m-bottom" />
  )
});
