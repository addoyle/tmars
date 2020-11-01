import React from 'react';
import Event from '../Event';
import {
  MegaCredit,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc = 'Remove up to 3 titanium from any player, or 4 steel, or 7 M€.';

export default new Event({
  number: 121,
  title: 'Sabotage',
  cost: 1,
  tags: ['event'],
  set: 'corporate',
  desc,
  flavor: 'Nobody will know who did it',
  action: () => {},
  emoji: '🏴‍☠️',
  layout: (
    <div className="text-center">
      <div className="resources">
        <span>-3</span>
        <Resource name="titanium" anyone />
        <span>&nbsp; OR -4</span>
        <Resource name="steel" anyone />
        <span>&nbsp; OR </span>
        <MegaCredit value="-7" anyone />
      </div>
      <div className="description text-center m-top">{desc}</div>
    </div>
  )
});
