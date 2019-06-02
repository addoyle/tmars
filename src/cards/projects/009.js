import React from 'react';
import Event from '../../components/Event';
import Resource from '../../components/assets/Resource';
import Param from '../../components/assets/Param';

const desc = 'Raise temperature 1 step and gain 2 titanium. Remove up to 3 plants from any player.';

export default new Event({
  number: 9,
  title: 'Asteroid',
  cost: 14,
  tags: ['space', 'event'],
  desc,
  flavor: 'What are those plants in our impact zone?',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '☄',
  layout: (
    <div className="flex gutter m-top m-bottom">
      <div className="resources col-1">
        <div>+ <Param name="temperature" /> <Resource name="titanium" /> <Resource name="titanium" /></div>
        <div>&ndash; <Resource name="plant" anyone /> <Resource name="plant" anyone /> <Resource name="plant" anyone /></div>
      </div>
      <div className="description col-1">{desc}</div>
    </div>
  )
});
