import React from 'react';
import Automated from '../../client/components/Automated';
import { Production, MegaCredit, Tag } from '../../client/components/assets/Assets';

const desc = 'Increase your M€ production 1 step for each space tag you have, including this.';

export default new Automated({
  number: 175,
  title: 'Satellites',
  cost: 10,
  tags: ['space'],
  set: 'corporate',
  desc,
  flavor: 'Coordinating orbital traffic',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🛰',
  layout: (
    <div className="text-center">
      <Production>
        <div className="flex">
          <MegaCredit value="1" />
          <div>/</div>
          <Tag name="space" />
        </div>
      </Production>
      <div className="description">{desc}</div>
    </div>
  )
});
