import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  MegaCredit,
  Production
} from '../../../client/game/components/assets/Assets';

// VERIFY PROMPT PLAYER

const desc =
  'Requires 3 ocean tiles. Decrease your M€ production 1 step and any heat production 1 step. Increase your plant production 2 steps.';

export default new Automated({
  number: 4,
  title: 'Cloud Seeding',
  cost: 11,
  tags: [],
  restriction: {
    value: 3,
    tile: 'ocean'
  },
  desc,
  flavor: 'Lessens solar influx, but enhances plant growth',
  action: (player, game, done) => {
    game.production(player, 'megacredit', -1);
    game.production(player, 'plant', 2);
    game.promptPlayer(
      targetPlayer => game.production(targetPlayer, 'heat', -1),
      done
    );
  },
  canPlay: player => {
    const valid = player.resources.megacredit > -5;
    return {
      valid,
      msg: !valid ? 'M€ production too low' : null
    };
  },
  emoji: '⛅',
  layout: (
    <div className="flex gutter">
      <div className="col-2 middle">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <MegaCredit value="1" />
            <Resource name="heat" anyone />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="plant" />
            <Resource name="plant" />
          </div>
        </Production>
      </div>
      <div className="col-3 middle description">{desc}</div>
    </div>
  )
});
