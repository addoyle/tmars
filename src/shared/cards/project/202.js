import React from 'react';
import Active from '../Active';
import {
  Production,
  Resource,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 10 M€ to increase your heat production 2 steps.';

export default new Active({
  number: 202,
  title: 'Underground Detonations',
  cost: 6,
  tags: ['building'],
  activeDesc,
  flavor:
    'Radiation from the nuclear blast is shielded, but over time, we are still getting the heat',
  emoji: '💥',
  todo: true,
  activeLayout: (
    <div>
      <div className="flex center">
        <div className="resources middle">
          <MegaCredit value="10" />
          <span className="arrow" />
        </div>
        <div className="middle">
          <Production>
            <div className="flex">
              <Resource name="heat" />
              <Resource name="heat" />
            </div>
          </Production>
        </div>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});
