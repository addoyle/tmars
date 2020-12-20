import React from 'react';
import Active from '../Active';
import {
  MegaCredit,
  Resource,
  Tile
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 8 M€ to place 1 ocean tile. STEEL MAY BE USED as if you were playing a building card.';

export default new Active({
  number: '187',
  title: 'Aquifer Pumping',
  cost: 18,
  tags: ['building'],
  activeDesc,
  flavor:
    'Underground water reservoirs may be tapped in a controlled manner, to safely build up oceans to the desired level',
  actions: [
    {
      name: 'Place an ocean',
      log: ['place an ocean ', { tile: 'ocean' }],
      icon: <Tile name="ocean" />,
      counter: {
        name: 'Use Steel',
        max: player =>
          Math.min(Math.ceil(8 / player.rates.steel), player.resources.steel),
        icon: <Resource name="steel" />,
        resultIcon: (count, player) => (
          <MegaCredit value={8 - count * player.rates.steel} />
        )
      },
      canPlay: (player, game, count) => {
        if (game.params.ocean <= 0) {
          return {
            valid: false,
            msg: 'All oceans have been placed'
          };
        }

        const valid =
          player.resources.megacredit + count * player.rates.steel >= 8;
        return {
          valid,
          msg: !valid ? 'Cannot afford this' : null
        };
      },
      action: (player, game, done, count) => {
        game.resources(
          player,
          'megacredit',
          -Math.max(0, 8 - count * player.rates.steel)
        );
        game.resources(player, 'steel', -count);
        game.promptTile(player, 'ocean', done);
      }
    }
  ],
  emoji: '🌊',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <MegaCredit value="8" />
        <span className="sup">
          (<Resource name="steel" />)
        </span>
        <span className="arrow" />
        <Tile name="ocean" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});
