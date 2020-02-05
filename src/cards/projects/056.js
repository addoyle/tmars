import React from 'react';
import Automated from '../Automated';
import { Production, Resource } from '../../client/components/assets/Assets';

const desc = 'Increase your steel production 1 step.';

export default new Automated({
  number: 56,
  title: 'Mine',
  cost: 4,
  tags: ['building'],
  desc,
  flavor: 'Mars\' main export industry also supplies the planet with construction materials',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '⛏',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="steel" />
          </div>
        </Production>
      </div>
      <div className="col-2 middle description">{desc}</div>
    </div>
  )
});
