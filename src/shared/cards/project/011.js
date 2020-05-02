import React from 'react';
import Event from '../Event';
import { Resource, Param } from '../../../client/game/components/assets/Assets';

const desc =
  'Raise temperature 2 steps and gain 4 titanium. Remove up to 4 plants from any player.';

export default new Event({
  number: 11,
  type: 'event',
  title: 'Big Asteroid',
  cost: 27,
  tags: ['space', 'event'],
  desc,
  flavor: 'There are many unpopulated areas to crash it in',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '☄',
  layout: (
    <div className="flex gutter m-top m-bottom">
      <div className="col-2">
        <div className="resources">
          +<Param name="temperature" />
          <Param name="temperature" />
        </div>
        <div className="resources">
          4<Resource name="plant" anyone />
        </div>
      </div>
      <div className="col-5">
        <div className="resources">
          <Resource name="titanium" />
          <Resource name="titanium" />
          <Resource name="titanium" />
          <Resource name="titanium" />
        </div>
        <div className="description">{desc}</div>
      </div>
    </div>
  )
});
