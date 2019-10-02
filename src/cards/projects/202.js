import React from 'react';
import Active from '../../client/components/Active';
import { Production, Resource, MegaCredit } from '../../client/components/assets/Assets';

const top_desc = 'Action: Spend 10 M€ to increase your heat production 2 steps.';

export default new Active({
  number: 202,
  title: 'Underground Detonations',
  cost: 6,
  tags: ['building'],
  top_desc,
  flavor: 'Radiation from the nuclear blast is shielded, but over time, we are still getting the heat',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '💥',
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
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div />
  )
});
