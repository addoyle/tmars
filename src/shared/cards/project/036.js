import React from 'react';
import Event from '../Event';
import { Resource } from '../../../client/game/components/assets/Assets';

const desc = 'Raise your terraform rating 2 steps.';

export default new Event({
  number: 36,
  title: 'Release of Inert Gases',
  cost: 14,
  tags: ['event'],
  desc,
  flavor:
    "We need some nitrogen and other inert gases to increase atmospheric pressure. Let's stay away from helium, though",
  action: () => {},
  emoji: '🌬',
  layout: (
    <div>
      <div className="text-center resources">
        <Resource name="tr" />
        <Resource name="tr" />
      </div>
      <div className="description text-center">{desc}</div>
    </div>
  )
});
