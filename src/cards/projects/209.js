import React from 'react';
import Event from '../../client/components/cards/Event';
import { Param, Resource } from '../../client/components/assets/Assets';

const desc = 'Increase temperature 1 step. Remove up to 2 plants from any player.';

export default new Event({
  number: 209,
  title: 'Small Asteroid',
  cost: 10,
  tags: ['space', 'event'],
  set: 'promo',
  desc,
  flavor: 'I made that crater - can I name it?',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '☄',
  layout: (
    <div className="flex m-bottom">
      <div className="col-1 middle">
        <div className="resources">
          <Param name="temperature" />
          <span>&ndash;</span>
          <Resource name="plant" anyone />&nbsp;
          <Resource name="plant" anyone />
        </div>
      </div>
      <div className="col-1 description middle">{desc}</div>
    </div>
  )
});
