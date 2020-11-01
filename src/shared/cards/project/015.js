import React from 'react';
import Active from '../Active';
import {
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Decrease your Energy production 1 step to increase your terraform rating 1 step.';

export default new Active({
  number: 15,
  title: 'Equatorial Magnetizer',
  cost: 11,
  tags: ['building'],
  activeDesc,
  flavor:
    'Super-conducting wires enircling the globe to create a magnetic field',
  action: () => {},
  clientActiveAction: () => {},
  serverActiveAction: () => {},
  emoji: '🧲',
  activeLayout: (
    <div className="text-center">
      <Production>
        <div className="flex">
          <div>&ndash;</div>
          <Resource name="power" />
        </div>
      </Production>
      <span className="resources">
        <span className="arrow" />
        <Resource name="tr" />
      </span>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div className="m-top m-bottom" />
});
