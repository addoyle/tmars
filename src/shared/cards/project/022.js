import React from 'react';
import Automated from '../Automated';
import {
  MegaCredit,
  Tile,
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc =
  'Place an ocean tile. Decrease your M€ prodution 2 steps and increase your heat production 3 steps.';

export default new Automated({
  number: 22,
  title: 'Black Polar Dust',
  cost: 15,
  tags: [],
  desc,
  flavor:
    'The sprinkled dust absorbs heat from the sun. Must be renewed after each snowfall, though',
  action: (player, game, done) => {
    game.production(player, 'megacredit', -2);
    game.production(player, 'heat', 3);
    game.promptTile(player, 'ocean', done);
  },
  canPlay: player => {
    const valid = player.production.megacredit > -4;
    return {
      valid,
      msg: !valid ? 'M€ production too low' : null
    };
  },
  emoji: '🌫',
  layout: (
    <div className="flex">
      <div className="col-1">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <MegaCredit value="2" />
            <Resource name="blank" />
            <Resource name="blank" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="heat" />
            <Resource name="heat" />
            <Resource name="heat" />
          </div>
        </Production>
      </div>
      <div className="col-1">
        <div className="resources">
          <Tile name="ocean" />
        </div>
        <div className="description">{desc}</div>
      </div>
    </div>
  )
});
