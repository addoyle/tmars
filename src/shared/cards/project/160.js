import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires 2 power tags. Decrease any energy production 1 step and increase your own 1 step.';

export default new Automated({
  number: 160,
  title: 'Power Supply Consortium',
  cost: 5,
  tags: ['power'],
  set: 'corporate',
  restriction: {
    value: 2,
    tag: 'power'
  },
  desc,
  flavor: 'Dominating the energy market allows you to make hostile takovers',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🔋',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" anyone />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-3 description middle">{desc}</div>
    </div>
  )
});
