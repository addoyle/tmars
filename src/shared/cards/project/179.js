import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your energy production 1 step and increase your plant production 1 step.';

export default new Automated({
  number: 179,
  title: 'Soil Factory',
  cost: 9,
  tags: ['building'],
  desc,
  flavor: 'There are many harmful elements to remove',
  action: (player, game) => {
    game.production(player, 'power', -1);
    game.production(player, 'plant', 1);
  },
  canPlay: player => {
    const valid = player.production.power > 0;
    return {
      valid,
      msg: !valid ? 'Not enough power production' : null
    };
  },
  vp: 1,
  emoji: '🌱',
  layout: (
    <div className="flex gutter">
      <div className="col-1">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="plant" />
          </div>
        </Production>
      </div>
      <div className="col-2 middle description">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
