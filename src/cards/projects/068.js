import React from 'react';
import Automated from '../Automated';
import { Production, MegaCredit } from '../../client/components/assets/Assets';

const desc = 'Increase your M€ production 2 steps.';

export default new Automated({
  number: 68,
  title: 'Sponsors',
  cost: 6,
  tags: ['earth'],
  set: 'corporate',
  desc,
  flavor: 'Willing to support your projects',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '💸',
  layout: (
    <div className="text-center">
      <Production>
        <div className="flex">
          <MegaCredit value="2" />
        </div>
      </Production>
      <div className="description m-top text-center">{desc}</div>
    </div>
  )
});
