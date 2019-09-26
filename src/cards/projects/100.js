import React from 'react';
import Automated from '../../client/components/Automated';
import { Production, Resource, MegaCredit } from '../../client/components/assets/Assets';

const desc = 'Decrease your M€ production 1 step and increase your energy production 1 step.';

export default new Automated({
  number: 100,
  title: 'Fueled Generators',
  cost: 1,
  tags: ['power', 'building'],
  desc,
  flavor: 'Simple but limited power supply',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🛢',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <MegaCredit value="1" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-3 middle description">{desc}</div>
    </div>
  )
});
