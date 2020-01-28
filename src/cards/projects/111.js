import React from 'react';
import Event from '../../client/components/cards/Event';
import { Resource, Param, Tile } from '../../client/components/assets/Assets';

const desc = 'LOOK AT THE TOP 4 CARDS FROM THE DECK. TAKE 2 OF THEM INTO HAND AND DISCARD THE OTHER 2.';

export default new Event({
  number: 111,
  title: 'Business Contacts',
  cost: 7,
  tags: ['earth', 'event'],
  set: 'corporate',
  desc,
  flavor: 'Money and information are often interchangeable',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🤝🏻',
  layout: (
    <div className="text-center m-bottom m-top">{desc}</div>
  )
});
