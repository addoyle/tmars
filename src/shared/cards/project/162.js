import React from 'react';
import Event from '../Event';
import {
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your heat production 1 step and gain 3 heat.';

export default new Event({
  number: '162',
  title: 'Imported GHG',
  cost: 7,
  tags: ['earth', 'space', 'event'],
  set: 'corporate',
  desc,
  flavor: 'Greenhouse gases (GHGs) to retain the heat',
  resources: {
    heat: 3
  },
  production: {
    heat: 1
  },
  emoji: '🍾',
  layout: (
    <div className="text-center">
      <div className="flex gutter center">
        <Production>
          <div className="flex">
            <Resource name="heat" />
          </div>
        </Production>
        <div className="resources middle">
          <Resource name="heat" />
          <Resource name="heat" />
          <Resource name="heat" />
        </div>
      </div>
      <div className="description text-center">{desc}</div>
    </div>
  )
});
