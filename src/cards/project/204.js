import React from 'react';
import Event from '../Event';
import { Param } from '../../client/game/components/assets/Assets';

const desc = 'Draw 2 cards.';

export default new Event({
  number: 204,
  title: 'Technology Demonstration',
  cost: 5,
  tags: ['science', 'space', 'event'],
  set: 'corporate',
  desc,
  flavor: 'Testing launch techniques, space hardware, and whatnot',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '💡',
  layout: (
    <div className="text-center">
      <div className="resources">
        <Param name="card back" />
        <Param name="card back" />
      </div>
      <div className="description">{desc}</div>
    </div>
  )
});
