import React from 'react';
import Active from '../Active';
import {
  Resource,
  Production,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 7 M€ to increase your energy production 1 step.';

export default new Active({
  number: 76,
  title: 'Space Mirrors',
  cost: 3,
  tags: ['power', 'space'],
  activeDesc,
  flavor:
    'Ultrathin mirrors reflecting sunlight down to receivers on the surface',
  clientAction: () => {},
  serverAction: () => {},
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
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div className="m-top"></div>
});
