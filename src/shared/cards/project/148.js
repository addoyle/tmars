import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  Tag
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires 6% oxygen. Increase your plant production 1 step for each plant tag you have.';

export default new Automated({
  number: 148,
  title: 'Insects',
  cost: 9,
  tags: ['microbe'],
  restriction: {
    value: 6,
    param: 'oxygen'
  },
  desc,
  flavor: 'Pollinating flowers and spreading seeds',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🐞',
  layout: (
    <div className="text-center">
      <Production>
        <div className="flex">
          <Resource name="plant" />
          <div>/</div>
          <Tag name="plant" />
        </div>
      </Production>
      <div className="description m-bottom">{desc}</div>
    </div>
  )
});
