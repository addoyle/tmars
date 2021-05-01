import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your energy production 1 step and increase your heat production 3 steps.';

export default new Automated({
  number: '043',
  title: 'Carbonate Processing',
  cost: 6,
  tags: ['building'],
  desc,
  flavor:
    'Common minerals can be converted into carbon dioxide that increases the greenhouse effect',
  production: {
    power: -1,
    heat: 3
  },
  emoji: '🏭',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
            <Resource name="blank" />
            <Resource name="blank" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="heat" />
            <Resource name="heat" />
            <Resource name="heat" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle">
        <div className="description">{desc}</div>
      </div>
    </div>
  )
});
