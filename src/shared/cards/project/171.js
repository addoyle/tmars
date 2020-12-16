import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your energy production 2 steps and increase your plant production 1 step. Raise your terraform rating 1 step.';

export default new Automated({
  number: 171,
  title: 'Magnetic Field Dome',
  cost: 5,
  tags: ['building'],
  desc,
  flavor: 'Protecting a limited area from cosmic radiation',
  action: (player, game) => {
    game.production(player, 'power', -2);
    game.production(player, 'plant', 1);
    game.tr(player, 1);
  },
  canPlay: player => {
    const valid = player.production.power >= 2;
    return {
      valid,
      msg: !valid ? 'Not enough power production' : null
    };
  },
  emoji: '🧲',
  layout: (
    <div className="text-center">
      <div className="flex gutter center">
        <div className="middle text-center">
          <Production>
            <div className="flex">
              <div className="col-1">&ndash;</div>
              <Resource name="power" />
              <Resource name="power" />
            </div>
            <div className="flex">
              <div className="col-1">+</div>
              <Resource name="plant" />
              <Resource name="blank" />
            </div>
          </Production>
        </div>
        <div className="middle text-center">
          <div className="resources">
            <Resource name="tr" />
          </div>
        </div>
      </div>
      <div className="description m-top">{desc}</div>
    </div>
  )
});
