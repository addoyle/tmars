import React from 'react';
import Event from '../Event';

const desc = 'ADD 1 RESOURCE TO A CARD WITH AT LEAST 1 RESOURCE ON IT';

export default new Event({
  number: 149,
  title: 'CEO\'s Favorite Project',
  cost: 1,
  tags: ['event'],
  desc,
  flavor: 'Having the top man\'s attention, the involved people are sure to do their best',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '👨🏻‍💼',
  layout: (
    <div className="text-center m-bottom">{desc}</div>
  )
});
