import React from 'react';
import Automated from '../../client/components/Automated';
import { Resource, Production, MegaCredit } from '../../client/components/assets/Assets';

const desc = 'Decrease your M€ production 2 steps and increase your energy production 3 steps.';

export default new Automated({
  number: 45,
  title: 'Nuclear Power',
  cost: 10,
  tags: ['power', 'building'],
  desc,
  flavor: 'A simple way to satisfy your energy needs',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🏭',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <MegaCredit value="2" />
            <Resource name="blank" />
            <Resource name="blank" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="power" />
            <Resource name="power" />
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle">
        <div className="description">{desc}</div>
      </div>
    </div>
  )
});
