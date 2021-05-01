import React from 'react';
import Prelude from '../Prelude';
import {
  MegaCredit,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'Decrease your M€ production 2 steps. Gain 30 M€.';

export default new Prelude({
  number: 'P17',
  title: 'Loan',
  tags: [],
  set: 'prelude',
  desc,
  flavor:
    'If your outgo exceeds your income, your upkeep will be your downfall',
  emoji: '💸',
  resources: {
    megacredit: 30
  },
  production: {
    megacredit: -2
  },
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <MegaCredit value="-2" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle">
        <div className="resources">
          <MegaCredit value="30" />
        </div>
      </div>
      <div className="description col-3 middle">{desc}</div>
    </div>
  )
});
