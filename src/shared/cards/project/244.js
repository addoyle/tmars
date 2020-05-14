import React from 'react';
import Automated from '../Automated';
import {
  Production,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires Venus and Earth tag. Increase your M€ production 3 steps.';

export default new Automated({
  number: 244,
  title: 'Sister Planet Support',
  cost: 7,
  tags: ['venus', 'earth'],
  set: 'venus',
  restriction: {
    value: 1,
    tag: ['venus', 'earth']
  },
  desc,
  flavor: 'Welcome to the 1G club',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🤝🏻',
  layout: (
    <div className="text-center m-bottom">
      <Production>
        <div className="flex">
          <MegaCredit value="3" />
        </div>
      </Production>
      <div className="description">{desc}</div>
    </div>
  )
});
