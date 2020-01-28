import React from 'react';
import Active from '../../client/components/cards/Active';
import { Resource, Production, MegaCredit } from '../../client/components/assets/Assets';

const top_desc = 'Action: Spend 7 M€ to increase your energy production 1 step.';

export default new Active({
  number: 76,
  title: 'Space Mirrors',
  cost: 3,
  tags: ['power', 'space'],
  top_desc,
  flavor: 'Ultrathin mirrors reflecting sunlight down to receivers on the surface',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🛰',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <MegaCredit value="7" />
        <span className="arrow" />
        <Production>
          <div className="flex">
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="m-top"></div>
  )
});
