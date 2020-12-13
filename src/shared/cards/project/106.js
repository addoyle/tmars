import React from 'react';
import Automated from '../Automated';
import {
  Production,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your M€ production 3 steps.';

export default new Automated({
  number: 106,
  title: 'Acquired Company',
  cost: 10,
  tags: ['earth'],
  set: 'corporate',
  desc,
  flavor: 'This interplanetary company will surely pay off',
  action: () => {},
  emoji: '🤝',
  todo: true,
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
