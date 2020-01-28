import React from 'react';
import Automated from '../../client/components/cards/Automated';
import { Production, MegaCredit, Tag } from '../../client/components/assets/Assets';

const desc = 'Increase your M€ production 3 steps.';

export default new Automated({
  number: 106,
  title: 'Acquired Company',
  cost: 10,
  tags: ['earth'],
  set: 'corporate',
  desc,
  flavor: 'This interplanetary company will surely pay off',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🤝',
  layout: (
    <div className="m-bottom">
      <div className="flex gutter center">
        <Production>
          <div className="flex">
            <MegaCredit value="3" />
          </div>
        </Production>
      </div>
      <div className="description text-center m-top">{desc}</div>
    </div>
  )
});
