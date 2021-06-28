import React from 'react';
import Automated from '../Automated';
import {
  MegaCredit,
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires that you lose 2 plants. Increase your M€ production 2 steps.';

export default new Automated({
  number: 'X28',
  title: 'Potatoes',
  cost: 2,
  tags: ['plant'],
  set: 'promo',
  desc,
  flavor: 'Excellent and sturdy food source for any planet',
  resources: { plant: -2 },
  production: { megacredit: 2 },
  emoji: '🥔',
  layout: (
    <div className="flex">
      <div className="col-1 middle text-center">
        <div className="resources">
          <span>&ndash;</span>
          <Resource name="plant" />
          <Resource name="plant" />
        </div>
        <Production>
          <div className="flex">
            <MegaCredit value="2" />
          </div>
        </Production>
      </div>
      <div className="col-2 description middle text-center">{desc}</div>
    </div>
  )
});
