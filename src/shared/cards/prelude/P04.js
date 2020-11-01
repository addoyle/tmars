import React from 'react';
import Prelude from '../Prelude';
import {
  Param,
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your plant production 1 step. Draw 3 cards.';

export default new Prelude({
  number: 'P04',
  title: 'Biolab',
  tags: ['science'],
  set: 'prelude',
  desc,
  flavor:
    'Bioengineering is of the utmost importance on Mars, and you just got a head start',
  emoji: '🥼',
  action: (player, game) => {
    game.production(player, 'plant', 1);
    game.drawCard(player);
    game.drawCard(player);
    game.drawCard(player);
  },
  layout: (
    <div className="flex gutter">
      <div className="col-1 text-center middle">
        <Production>
          <div className="flex">
            <Resource name="plant" />
          </div>
        </Production>
      </div>
      <div className="col-2 text-center middle">
        <div className="resources">
          <Param name="card back" />
          <Param name="card back" />
          <Param name="card back" />
        </div>
      </div>
      <div className="description col-3 middle">{desc}</div>
    </div>
  )
});
