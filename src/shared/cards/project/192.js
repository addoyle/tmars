import React from 'react';
import Event from '../Event';

const desc =
  'LOOK AT THE TOP 3 CARDS FROM THE DECK. TAKE 1 OF THEM INTO HAND AND DISCARD THE OTHER 2';

export default new Event({
  number: 192,
  title: 'Invention Contest',
  cost: 2,
  tags: ['science', 'event'],
  set: 'corporate',
  desc,
  flavor: 'Engaging the scientific community in a field of your choice',
  action: () => {},
  emoji: '👨‍🔬',
  todo: true,
  layout: <div className="text-center sans-serif strong">{desc}</div>
});
