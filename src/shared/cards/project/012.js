import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit,
  Tile,
  Tag,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Pay 12 M€ to place an ocean tile. TITANIUM MAY BE USED as if playing a space card.';
const desc = '1 VP for each Jovian tag you have.';

export default new Active({
  number: '012',
  title: 'Water Import From Europa',
  cost: 25,
  tags: ['jovian', 'space'],
  activeDesc,
  desc,
  flavor:
    'With its low gravity, this Jovian ice moon is suitable for mass export of water.',
  actions: [
    {
      name: 'Place an ocean',
      log: ['place an ocean ', { tile: 'ocean' }],
      icon: <Tile name="ocean" />,
      counter: {
        name: 'Use Titanium',
        max: player =>
          Math.min(
            Math.ceil(12 / player.rates.titanium),
            player.resources.titanium
          ),
        icon: <Resource name="titanium" />,
        resultIcon: (count, player) => (
          <MegaCredit value={12 - count * player.rates.titanium} />
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
          player.resources.megacredit + count * player.rates.titanium >= 12;
        return {
          valid,
          msg: !valid ? 'Cannot afford this' : null
        };
      },
      action: (player, game, done, count) => {
        game.resources(
          player,
          'megacredit',
          -Math.max(0, 12 - count * player.rates.titanium)
        );
        game.resources(player, 'titanium', -count);
        game.promptTile(player, 'ocean', done);
      }
    }
  ],
  vp: player => player.tags.jovian,
  emoji: '💧',
  activeLayout: (
    <div>
      <div className="center text-center">
        <div className="resources">
          <MegaCredit value="12" />
          <span className="sup">
            (<Resource name="titanium" />)
          </span>
          <span className="arrow" />
          <Tile name="ocean" />
        </div>
        <div className="description text-center">{activeDesc}</div>
      </div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-4 description middle">{desc}</div>
      <div className="col-1 middle">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/<Tag name="jovian" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
