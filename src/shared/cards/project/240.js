import React from 'react';
import Automated from '../Automated';
import { Param } from '../../../client/game/components/assets/Assets';

const desc = 'Requires Venus 10%. Increase Venus 1 step.';

export default new Automated({
  number: '240',
  title: 'Neutralizer Factory',
  cost: 7,
  tags: ['venus'],
  set: 'venus',
  restriction: {
    value: 10,
    param: 'venus'
  },
  desc,
  flavor: 'Removing the sulphuric acids',
  param: ['venus'],
  emoji: '🏭',
  layout: (
    <div className="m-top m-bottom flex gutter">
      <div className="resources middle">
        <Param name="venus" />
      </div>
      <div className="description middle">{desc}</div>
    </div>
  )
});
