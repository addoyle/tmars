import React from 'react';
import Prelude from '../Prelude';
import {
  Tile,
  Resource,
  Production,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const desc =
  'Place an ocean tile. Increase your energy production 2 steps. Remove 3 M€.';

export default new Prelude({
  number: 'P02',
  title: 'Aquifer Turbines',
  tags: ['power'],
  set: 'prelude',
  desc,
  flavor:
    'The high pressure of an underground aquifer can be used for energy production when the water is released',
  emoji: '💦',
  action: (player, game, done) => {
    game.production(player, 'power', 2);
    game.resources(player, 'megacredit', -3);
    game.promptTile('ocean', player, done);
  },
  layout: (
    <div className="flex gutter">
      <div className="col-1 text-center middle">
        <div className="resources">
          <Tile name="ocean" />
        </div>
      </div>
      <div className="col-1 text-center middle">
        <Production>
          <div className="flex">
            <Resource name="power" />
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle">
        <div className="resources">
          <MegaCredit value="-3" />
        </div>
      </div>
      <div className="description col-3 middle">{desc}</div>
    </div>
  )
});
