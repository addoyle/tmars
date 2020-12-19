import React from 'react';
import Event from '../Event';
import { Resource } from '../../../client/game/components/assets/Assets';

// TODO FIGURE OUT HOW TO DO OR AND CARD PICKER

const desc = 'Remove up to 2 animals or 5 plants from any player.';

export default new Event({
  number: '050',
  title: 'Virus',
  cost: 1,
  tags: ['microbe', 'event'],
  set: 'corporate',
  desc,
  flavor:
    'The virus is transient, changing from liquid to air-borne to blood transfusion',
  action: () => {},
  emoji: '🦠',
  todo: true,
  layout: (
    <div>
      <div className="resources text-center">
        <span>-2</span>
        <Resource name="animal" anyone />
        <span> OR -5</span>
        <Resource name="plant" anyone />
      </div>
      <div className="description text-center">{desc}</div>
    </div>
  )
});
