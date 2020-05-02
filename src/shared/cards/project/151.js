import React from 'react';
import Event from '../Event';
import {
  Production,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const desc = 'Decrease your M€ production 1 step. Gain 10 M€.';

export default new Event({
  number: 151,
  title: 'Investment Loan',
  cost: 3,
  tags: ['earth', 'event'],
  set: 'corporate',
  desc,
  flavor: 'Taking a loan to fund that urgent project',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '📉',
  layout: (
    <div className="text-center">
      <div className="flex gutter center">
        <Production>
          <div className="flex">
            <MegaCredit value="-1" />
          </div>
        </Production>
        <div className="resources middle">
          <MegaCredit value="10" />
        </div>
      </div>
      <div className="description text-center">{desc}</div>
    </div>
  )
});
