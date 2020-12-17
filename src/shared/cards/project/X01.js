import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires 2 science tags. Decrease your energy production 1 step, and increase your titanium production 1 step. Gain 4 titanium.';

export default new Automated({
  number: 'X01',
  title: 'Dusk Laser Mining',
  cost: 8,
  tags: ['space'],
  set: 'promo',
  restriction: {
    value: 2,
    tag: 'science'
  },
  desc,
  flavor:
    'Treating the smouldering Mercurian ground at sunset, collecting the separated molten metals',
  action: (player, game) => {
    game.production(player, 'power', -1);
    game.production(player, 'titanium', 1);
    game.resources(player, 'titanium', 4);
  },
  canPlay: player => {
    const valid = player.production.power < 1;
    return {
      valid,
      msg: !valid ? 'Not enough power production' : null
    };
  },
  emoji: '🌘',
  layout: (
    <div className="flex gutter">
      <div className="middle text-center">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="titanium" />
          </div>
        </Production>
        <div className="resources">
          <span>4</span>
          <Resource name="titanium" />
        </div>
      </div>
      <div className="description middle">{desc}</div>
    </div>
  )
});
