import React from 'react';
import Automated from '../Automated';
import {
  MegaCredit,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'Requires 2 Venus tags. Increase your M€ production 2 steps.';

export default new Automated({
  number: 255,
  title: 'Venus Governor',
  cost: 4,
  tags: ['venus', 'venus'],
  set: 'venus',
  restriction: {
    value: 2,
    tag: 'venus'
  },
  desc,
  flavor:
    'Bringing order to the colonization and terraforming of Venus is a well-paid job',
  action: () => {},
  emoji: '👵',
  todo: true,
  layout: (
    <div className="flex gutter m-top m-bottom">
      <Production>
        <MegaCredit value="2" />
      </Production>
      <div className="description middle">{desc}</div>
    </div>
  )
});
