import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your plant production 1 step.';

export default new Automated({
  number: '048',
  title: 'Adapted Lichen',
  cost: 9,
  tags: ['plant'],
  desc,
  flavor: 'Suitable even for early terraforming',
  production: {
    plant: 1
  },
  emoji: '🍀',
  layout: (
    <div className="flex gutter m-top m-bottom">
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <Resource name="plant" />
          </div>
        </Production>
      </div>
      <div className="col-4 middle description">{desc}</div>
    </div>
  )
});
