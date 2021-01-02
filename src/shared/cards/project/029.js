import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  Production,
  Tile,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const desc =
  'Oxygen must be 9% or less. Place a city tile. Decrease your energy production 1 step and increase your M€ production 3 steps.';

export default new Automated({
  number: '029',
  title: 'Cupola City',
  cost: 16,
  tags: ['city', 'building'],
  restriction: {
    max: true,
    value: 9,
    param: 'oxygen'
  },
  desc,
  flavor:
    'In a thin atmosphere, normal pressure can hold up a protective dome over the city.',
  action: (player, game, done) => {
    game.production(player, 'power', -1);
    game.production(player, 'megacredit', 3);
    game.promptTile(player, 'city', done);
  },
  canPlay: (player, game) => {
    if (player.production.power < 1) {
      return {
        valid: false,
        msg: 'Not enough energy production'
      };
    }

    const valid = !!game.findPossibleTiles('city', player).length;
    return {
      valid,
      msg: !valid ? 'Cannot place city tile' : null
    };
  },
  emoji: '🌇',
  layout: (
    <div className="flex">
      <div className="col-1">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <MegaCredit value="3" />
          </div>
        </Production>
      </div>
      <div className="col-1 resources middle text-center">
        <Tile name="city" />
      </div>
      <div className="col-3 description middle">{desc}</div>
    </div>
  )
});
