import React from 'react';
import Automated from '../Automated';
import { Param } from '../../../client/game/components/assets/Assets';

const desc = 'Raise Venus 3 steps.';

export default new Automated({
  number: '229',
  title: 'Giant Solar Shade',
  cost: 27,
  tags: ['venus', 'space'],
  set: 'venus',
  desc,
  flavor:
    'Drastically lowering the temperature to cause CO\u2082 to precipitate, reducing the greenhouse effect',
  param: ['venus', 'venus', 'venus'],
  emoji: '⛱',
  layout: (
    <div className="m-top m-bottom">
      <div className="resources text-center">
        <span>+3</span>
        <Param name="venus" />
      </div>
      <div className="description text-center">{desc}</div>
    </div>
  )
});
