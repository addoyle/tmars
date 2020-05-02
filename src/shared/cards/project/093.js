import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires -10°C or warmer. Increase your plant production 2 steps. Gain 2 plants.';

export default new Automated({
  number: 93,
  title: 'Bushes',
  cost: 10,
  tags: ['plant'],
  restriction: {
    value: -10,
    param: 'temperature'
  },
  desc,
  flavor: 'Giving some wind protection for smaller species',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🌳',
  layout: (
    <div className="m-bottom">
      <div className="flex gutter center">
        <Production>
          <div className="flex">
            <Resource name="plant" />
            <Resource name="plant" />
          </div>
        </Production>
        <div className="resources middle">
          <Resource name="plant" />
          <Resource name="plant" />
        </div>
      </div>
      <div className="description text-center m-top">{desc}</div>
    </div>
  )
});
