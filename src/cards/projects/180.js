import React from 'react';
import Automated from '../Automated';
import { Production, Resource, MegaCredit } from '../../client/components/assets/Assets';

const desc = 'Decrease your energy production 1 step and increase your titanium and your M€ production 1 step each.';

export default new Automated({
  number: 180,
  title: 'Fuel Factory',
  cost: 6,
  tags: ['building'],
  set: 'corporate',
  desc,
  flavor: 'With its shallow gravity well, Mars is a good host for the space industry, and rockets need fuel',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '⛽',
  layout: (
    <div className="flex gutter">
      <div className="col-2 middle text-center">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
            <Resource name="blank" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="titanium" />
            <MegaCredit value="1" />
          </div>
        </Production>
      </div>
      <div className="col-3 description middle">{desc}</div>
    </div>
  )
});
