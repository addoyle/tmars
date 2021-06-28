import React from 'react';
import Automated from '../Automated';
import {
  Production,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const desc = 'Requires 2 Earth tags. Increase your M€ production 4 steps.';

export default new Automated({
  number: 'P42',
  title: 'Space Hotels',
  cost: 12,
  tags: ['earth', 'space'],
  set: 'prelude',
  restriction: {
    value: 2,
    tag: 'earth'
  },
  desc,
  flavor:
    'Space tourism was one of the most important sources of income for the space industry',
  production: {
    megacredit: 4
  },
  emoji: '🏨',
  layout: (
    <div className="flex m-top m-bottom">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <MegaCredit value="4" />
          </div>
        </Production>
      </div>
      <div className="col-2 description middle">{desc}</div>
    </div>
  )
});
