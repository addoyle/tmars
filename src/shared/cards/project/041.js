import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  Production,
  MegaCredit,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your plant production 1 step and increase your M€ production 4 steps.';

export default new Automated({
  number: 41,
  title: 'Food Factory',
  cost: 12,
  tags: ['building'],
  desc,
  flavor: 'For the growing population',
  action: (player, game) => {
    game.production(player, 'plant', -1);
    game.production(player, 'megacredit', 4);
  },
  canPlay: player => {
    const valid = player.production.plant >= 1;
    return {
      valid,
      msg: !valid ? 'Not enough plant production' : null
    };
  },
  vp: 1,
  emoji: '🌽',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="plant" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <MegaCredit value="4" />
          </div>
        </Production>
      </div>
      <div className="col-2 middle">
        <div className="description">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
