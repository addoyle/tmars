import React from 'react';
import Prelude from '../Prelude';
import {
  Production,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your M€ production 4 steps. Gain 3 M€.';

export default new Prelude({
  number: 'P01',
  title: 'Allied Bank',
  tags: ['earth'],
  set: 'prelude',
  desc,
  flavor: 'Putting people’s savings to good use',
  emoji: '🏦',
  resources: {
    megacredit: 3
  },
  production: {
    megacredit: 4
  },
  layout: (
    <div className="flex">
      <div className="col-1 text-center middle">
        <Production>
          <div className="flex">
            <MegaCredit value="4" />
          </div>
        </Production>
      </div>
      <div className="col-1 text-center middle">
        <div className="resources">
          <MegaCredit value="3" />
        </div>
      </div>
      <div className="description col-5 text-center middle">{desc}</div>
    </div>
  )
});
