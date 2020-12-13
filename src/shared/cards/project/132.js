import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc = 'Requires 2 power tags. Increase your energy production 3 steps.';

export default new Automated({
  number: 132,
  title: 'Fusion Power',
  cost: 14,
  tags: ['science', 'power', 'building'],
  restriction: {
    value: 2,
    tag: 'power'
  },
  desc,
  flavor: 'State of the art technology',
  action: () => {},
  emoji: '🔮',
  todo: true,
  layout: (
    <div className="text-center">
      <Production>
        <div className="flex">
          <Resource name="power" />
          <Resource name="power" />
          <Resource name="power" />
        </div>
      </Production>
      <div className="description">{desc}</div>
    </div>
  )
});
