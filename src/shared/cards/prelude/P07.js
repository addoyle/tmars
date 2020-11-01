import React from 'react';
import Prelude from '../Prelude';
import {
  MegaCredit,
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase your plant production 1 step. Increase your M€ production 2 steps.';

export default new Prelude({
  number: 'P07',
  title: 'Dome Farming',
  tags: ['plant', 'building'],
  set: 'prelude',
  desc,
  flavor: 'Growing flowers, bushes, and trees... but mainly potatoes...',
  emoji: '🥔',
  action: (player, game) => {
    game.production(player, 'plant', 1);
    game.production(player, 'megacredit', 2);
  },
  layout: (
    <div className="flex gutter">
      <div className="col-1 text-center middle">
        <Production>
          <div className="flex">
            <Resource name="plant" />
            <MegaCredit value="2" />
          </div>
        </Production>
      </div>
      <div className="description col-3 middle">{desc}</div>
    </div>
  )
});
