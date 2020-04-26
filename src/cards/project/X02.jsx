import React from 'react';
import Event from '../Event';

const desc = 'USE A CARD ACTION THAT HAS ALREADY BEEN USED THIS GENERATION';

export default new Event({
  number: 'X02',
  title: 'Project Inspection',
  cost: 0,
  tags: ['event'],
  set: 'promo',
  desc,
  flavor:
    'Everybody seems to be more concerned with doing their best when inspectors are scheduled to arrive',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🕵️',
  layout: <div className="m-top m-bottom text-center">{desc}</div>
});
