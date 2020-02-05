import React from 'react';
import Automated from '../Automated';
import { Production, Resource } from '../../client/components/assets/Assets';

const desc = 'Increase your heat production 7 steps.';

export default new Automated({
  number: 203,
  title: 'Soletta',
  cost: 35,
  tags: ['space'],
  desc,
  flavor: 'Huge ultra-thin mirrors focusing sunlight onto the red planet',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🔍',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <span className="col-1 middle">7</span>
            <Resource name="heat" />
          </div>
        </Production>
      </div>
      <div className="col-2 middle text-center description">{desc}</div>
    </div>
  )
});
