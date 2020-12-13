import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  Production,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your titanium production 2 steps.';

export default new Automated({
  number: 40,
  title: 'Asteroid Mining',
  cost: 30,
  tags: ['jovian', 'space'],
  desc,
  flavor: 'Where gravity is low and rare minerals abound',
  action: (player, game) => game.production(player, 'titanium', 2),
  vp: 2,
  emoji: '🌖',
  layout: (
    <div className="flex">
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <Resource name="titanium" />
            <Resource name="titanium" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle">
        <div className="description">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
