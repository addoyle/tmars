import React from 'react';
import Automated from '../Automated';
import {
  MegaCredit,
  Production
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires that you have at least 25 TR. Increase your M€ production 4 steps.';

export default new Automated({
  number: 252,
  title: 'Terraforming Contract',
  cost: 8,
  tags: ['earth'],
  set: 'venus',
  restriction: {
    value: 25,
    resource: 'tr'
  },
  desc,
  flavor: 'A lucrative deal for a proven terraformer',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '📜',
  layout: (
    <div className="flex gutter m-top">
      <Production>
        <MegaCredit value="4" />
      </Production>
      <div className="description">{desc}</div>
    </div>
  )
});
