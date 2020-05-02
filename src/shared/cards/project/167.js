import React from 'react';
import Event from '../Event';
import {
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your heat production 2 steps.';

export default new Event({
  number: 167,
  title: 'Import of Advanced GHG',
  cost: 9,
  tags: ['earth', 'space', 'event'],
  desc,
  flavor: 'Greenhouse gases (GHG) with improved effect',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🍾',
  layout: (
    <div className="text-center">
      <Production>
        <div className="flex">
          <Resource name="heat" />
          <Resource name="heat" />
        </div>
      </Production>
      <div className="description text-center m-bottom">{desc}</div>
    </div>
  )
});
