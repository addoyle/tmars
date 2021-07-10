import React from 'react';
import Active from '../Active';
import { Resource, Param } from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Spend 1 energy to draw a card.';

export default new Active({
  number: '014',
  title: 'Development Center',
  cost: 11,
  tags: ['science', 'building'],
  set: 'corporate',
  activeDesc,
  flavor: 'Ensuring a constant influx of ideas',
  actions: [
    {
      name: 'Spend 1 Energy',
      icon: <Resource name="power" />,
      resources: {
        power: -1
      },
      drawCard: 1
    }
  ],
  emoji: '🏢',
  activeLayout: (
    <div>
      <div className="center text-center">
        <div className="resources">
          <Resource name="power" />
          <span className="arrow" />
          <Param name="card back" />
        </div>
        <div className="description text-center">{activeDesc}</div>
      </div>
    </div>
  ),
  layout: <div className="m-top m-bottom" />
});
