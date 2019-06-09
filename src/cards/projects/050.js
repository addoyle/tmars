import React from 'react';
import Event from '../../components/Event';
import Resource from '../../components/assets/Resource';

const desc = 'Remove up to 2 animals or 5 plants from any player.';

export default new Event({
  number: 50,
  title: 'Virus',
  cost: 1,
  tags: ['microbe', 'event'],
  set: 'corporate',
  desc,
  flavor: 'The virus is transient, changing from liquid to air-borne to blood transfusion',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🦠',
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
