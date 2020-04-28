import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../client/game/components/assets/Assets';

const desc =
  'Requires -14°C or warmer. Increase your plant production 1 step. Gain 1 plant.';

export default new Automated({
  number: 88,
  title: 'Heather',
  cost: 6,
  tags: ['plant'],
  restriction: {
    value: -14,
    param: 'temperature'
  },
  desc,
  flavor: 'Stabilizing the soil',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🌾',
  layout: (
    <div className="m-bottom">
      <div className="flex gutter center">
        <Production>
          <div className="flex">
            <Resource name="plant" />
          </div>
        </Production>
        <div className="resources middle">
          <Resource name="plant" />
        </div>
      </div>
      <div className="description text-center m-top">{desc}</div>
    </div>
  )
});
