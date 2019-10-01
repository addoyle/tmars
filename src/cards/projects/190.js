import React from 'react';
import Event from '../../client/components/Event';
import { Resource } from '../../client/components/assets/Assets';

const desc = 'Spend 5 heat to either gain 4 plants, or to add 2 animals to ANOTHER card.';

export default new Event({
  number: 190,
  title: 'Local Heat Trapping',
  cost: 1,
  tags: ['event'],
  desc,
  flavor: 'Life can benefit from local hot spots',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🔥',
  layout: (
    <div className="text-center">
      <div className="flex gutter center">
        <div className="resources">
          <span>-5</span>
          <Resource name="heat" />
        </div>
        <div className="resources">
          <span>+ 4</span>
          <Resource name="plant" />
          <span>OR 2</span>
          <Resource name="animal" />
        </div>
      </div>
      <div className="description m-top">{desc}</div>
    </div>
  )
});
