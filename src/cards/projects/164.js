import React from 'react';
import Automated from '../Automated';
import { Production, Resource } from '../../client/components/assets/Assets';

const desc = 'Increase your heat production 1 step.';

export default new Automated({
  number: 164,
  title: 'Micro-Mills',
  cost: 3,
  tags: [],
  desc,
  flavor: 'Small, mass-produced windmills that convert some of the ever-present wind into heat',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '💨',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="heat" />
          </div>
        </Production>
      </div>
      <div className="col-3 description text-center middle">{desc}</div>
    </div>
  )
});
