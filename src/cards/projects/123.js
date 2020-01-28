import React from 'react';
import Active from '../../client/components/cards/Active';
import { Production, Resource, MegaCredit, Tile } from '../../client/components/assets/Assets';

const top_desc = 'Action: Spend 7 M€ to increase your steel production 1 step.';
const desc = 'Place this tile ADJACENT TO A CITY TILE.';

export default new Active({
  number: 123,
  title: 'Industrial Center',
  cost: 4,
  tags: ['building'],
  set: 'corporate',
  top_desc,
  desc,
  flavor: 'Assigned to heavy industry, this area is not the nicest place on Mars',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🏭',
  activeLayout: (
    <div className="text-center">
      <div className="resources">
        <MegaCredit value="7" />
        <span className="arrow" />
        <Production>
          <div className="flex">
            <Resource name="steel" />
          </div>
        </Production>
      </div>
      <div className="description">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-1 text-center">
        <div className="resources">
          <Tile name="special" icon="factory" />
        </div>
      </div>
      <div className="col-3 description middle text-center">{desc}</div>
    </div>
  )
});
