import React from 'react';
import Event from '../Event';
import { Resource } from '../../../client/game/components/assets/Assets';

const desc = 'Gain 4 plants, and add 4 microbes to ANOTHER CARD.';

export default new Event({
  number: 'X22',
  title: 'Imported Nutrients',
  cost: 14,
  tags: ['earth', 'space', 'event'],
  set: 'promo',
  desc,
  flavor:
    'Supplying elements that are essential for biological life, but are scarce on Mars',
  resources: {
    plant: 4,
    microbe: 4
  },
  emoji: '🍎',
  layout: (
    <div className="text-center m-top">
      <div className="resources">
        <span>4</span>
        <Resource name="plant" />
        &nbsp;
        <span>4</span>
        <Resource name="microbe" />*
      </div>
      <div className="m-top description">{desc}</div>
    </div>
  )
});
