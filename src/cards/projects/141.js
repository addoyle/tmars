import React from 'react';
import Automated from '../../client/components/Automated';
import { Production, Resource } from '../../client/components/assets/Assets';

const desc = 'Increase your power production 1 step.';

export default new Automated({
  number: 141,
  title: 'Power Plant',
  cost: 4,
  tags: ['power', 'building'],
  desc,
  flavor: 'Standard equipment, normal output',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🏭',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-3 description text-center middle">{desc}</div>
    </div>
  )
});
