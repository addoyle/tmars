import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your energy production 1 step and increase your steel production 2 steps.';

export default new Automated({
  number: '065',
  title: 'Building Industries',
  cost: 6,
  tags: ['building'],
  set: 'corporate',
  desc,
  flavor: 'Accelerating building of the infrastructure',
  production: {
    power: -1,
    steel: 2
  },
  emoji: '🏗',
  layout: (
    <div className="flex gutter">
      <div className="col-1">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
            <Resource name="blank" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="steel" />
            <Resource name="steel" />
          </div>
        </Production>
      </div>
      <div className="col-2 middle description">{desc}</div>
    </div>
  )
});
