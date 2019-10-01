import React from 'react';
import Event from '../../client/components/Event';
import { Resource } from '../../client/components/assets/Assets';

const desc = 'Raise your TR 1 step and gain 4 plants. Add 3 microbes to ANOTHER card and 2 animals to ANOTHER card.';

export default new Event({
  number: 163,
  title: 'Imported Nitrogen',
  cost: 23,
  tags: ['earth', 'space', 'event'],
  desc,
  flavor: 'Providing nitrogen needed in the atmosphere and for biomass',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🍾',
  layout: (
    <div className="text-center">
      <div className="flex gutter">
        <div className="resources middle">
          <Resource name="tr" />
        </div>
        <div className="resources middle">
          <span>4</span>
          <Resource name="plant" />
          <span> 3</span>
          <Resource name="microbe" />
          <span>* 2</span>
          <Resource name="animal" />
          <span>*</span>
        </div>
      </div>
      <div className="description text-center m-top">{desc}</div>
    </div>
  )
});
