import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires a Jovian tag. Increase your heat production and energy production 3 steps each.';

export default new Automated({
  number: '058',
  title: 'Beam From A Thorium Asteroid',
  cost: 32,
  tags: ['jovian', 'space', 'power'],
  restriction: {
    value: 1,
    tag: 'jovian'
  },
  desc,
  flavor:
    'Nuclear energy is safe, especially when located on a remote asteroid rich in radioactive elements',
  production: {
    heat: 3,
    power: 3
  },
  vp: 1,
  emoji: '🔫',
  layout: (
    <div className="flex gutter">
      <div className="col-1">
        <Production>
          <div className="flex">
            <Resource name="heat" />
            <Resource name="heat" />
            <Resource name="heat" />
          </div>
          <div className="flex">
            <Resource name="power" />
            <Resource name="power" />
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-2 bottom">
        <div className="description m-bottom">{desc}</div>
        <div className="float-right">
          <VictoryPoint>
            <span className="big point">1</span>
          </VictoryPoint>
        </div>
      </div>
    </div>
  )
});
