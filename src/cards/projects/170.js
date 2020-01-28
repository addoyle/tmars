import React from 'react';
import Event from '../../client/components/cards/Event';
import { Production, Resource } from '../../client/components/assets/Assets';

const desc = 'Add 2 microbes to ANOTHER card. Increase your heat production 3 steps and your plant production 1 step.';

export default new Event({
  number: 170,
  title: 'Aerobraked Ammonia Asteroid',
  cost: 26,
  tags: ['space', 'event'],
  desc,
  flavor: 'Ammonia is a greenhouse gas, as well as being a convenient nitrogen source for organisms',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '☄',
  layout: (
    <div className="flex gutter">
      <div className="col-1">
        <div className="resources">
          <Resource name="microbe" />
          <Resource name="microbe" />
          <span>*</span>
        </div>
        <Production>
          <div className="flex">
            <Resource name="heat" />
            <Resource name="heat" />
            <Resource name="heat" />
          </div>
          <div className="flex">
            <Resource name="blank" />
            <Resource name="plant" />
            <Resource name="blank" />
          </div>
        </Production>
      </div>
      <div className="col-1 description middle">{desc}</div>
    </div>
  )
});
