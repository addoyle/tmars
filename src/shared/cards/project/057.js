import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your titanium production 1 step.';

export default new Automated({
  number: 57,
  title: 'Vesta Shipyard',
  cost: 15,
  tags: ['jovian', 'space'],
  set: 'corporate',
  desc,
  flavor: 'The pride of the asteroid belt',
  action: (player, game) => game.production(player, 'titanium', 1),
  vp: 1,
  emoji: '🛰',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="titanium" />
          </div>
        </Production>
      </div>
      <div className="col-2 middle description text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
