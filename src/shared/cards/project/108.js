import React from 'react';
import Automated from '../Automated';
import {
  Production,
  MegaCredit,
  Resource,
  Tile,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires 12% oxygen. Decrease your energy production 1 step and increase your M€ production 4 steps. Gain 2 plants and place a city tile.';

export default new Automated({
  number: '108',
  title: 'Open City',
  cost: 23,
  tags: ['city', 'building'],
  restriction: {
    value: 12,
    param: 'oxygen'
  },
  desc,
  flavor: 'Not very comfortable conditions yet, but what freedom!!',
  action: (player, game, done) => {
    game.production(player, 'power', -1);
    game.production(player, 'megacredit', 4);
    game.resources(player, 'plant', 2);
    game.promptTile(player, 'city', done);
  },
  canPlay: (player, game) => {
    if (player.production.power < 1) {
      return {
        valid: false,
        msg: 'Not enough power production'
      };
    }

    const valid = !!game.findPossibleTiles('city', player).length;
    return {
      valid,
      msg: !valid ? 'Cannot place this tile' : null
    };
  },
  vp: 1,
  emoji: '🏙',
  layout: (
    <div>
      <div className="flex gutter center">
        <div className="col-1 text-center">
          <Production>
            <div className="flex">
              <div className="col-1">&ndash;</div>
              <Resource name="power" />
            </div>
            <div className="flex">
              <div className="col-1">+</div>
              <MegaCredit value="4" />
            </div>
          </Production>
        </div>
        <div className="resources col-2 middle">
          <Resource name="plant" />
          <Resource name="plant" />
          <Tile name="city" />
        </div>
      </div>
      <div className="flex gutter">
        <div className="description text-center m-top col-3">{desc}</div>
        <div className="col-1 bottom">
          <VictoryPoint>
            <span className="big point">1</span>
          </VictoryPoint>
        </div>
      </div>
    </div>
  )
});
