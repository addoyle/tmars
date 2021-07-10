import React from 'react';
import Active from '../Active';
import {
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Decrease your Energy production 1 step to increase your terraform rating 1 step.';

export default new Active({
  number: '015',
  title: 'Equatorial Magnetizer',
  cost: 11,
  tags: ['building'],
  activeDesc,
  flavor:
    'Super-conducting wires enircling the globe to create a magnetic field',
  actions: [
    {
      name: 'Spend 1 Energy Production',
      icon: (
        <Production>
          <div className="flex">
            <Resource name="power" />
          </div>
        </Production>
      ),
      production: {
        power: -1
      },
      tr: 1
    }
  ],
  emoji: '🧲',
  activeLayout: (
    <div className="text-center">
      <div className="flex center">
        <Production>
          <div className="flex">
            <div>&ndash;</div>
            <Resource name="power" />
          </div>
        </Production>
        <span className="resources middle">
          <span className="arrow" />
          <Resource name="tr" />
        </span>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div className="m-top m-bottom" />
});
