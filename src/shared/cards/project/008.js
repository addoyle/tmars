import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  MegaCredit,
  VictoryPoint,
  Tile,
  Production
} from '../../../client/game/components/assets/Assets';

// VERIFY VP

const desc =
  'Requires 4 ocean tiles. Place this tile. Decrease your energy production 2 steps and increase your M€ production 5 steps. 1 ADDITIONAL VP FOR EACH OCEAN TILE ADJACENT TO THIS CITY TILE.';

export default new Automated({
  number: 8,
  title: 'Capital',
  cost: 26,
  tags: ['city', 'building'],
  restriction: {
    value: 4,
    tile: 'ocean'
  },
  desc,
  flavor:
    'With its ideal placement and all its facilities, this is the true capital of Mars',
  action: (player, game, done) => {
    game.production(player, 'power', -2);
    game.production(player, 'megacredit', 5);
    game.promptTile(player, 'capital city', tile => {
      this.tile = tile;
      done();
    });
  },
  canPlay: (player, game) => {
    if (player.production.power < 2) {
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
  vp: (player, game) =>
    // 1 VP per neighboring ocean
    game.neighbors(this.tile).filter(t => t.type === 'ocean').length,
  emoji: '🏛',
  layout: (
    <div>
      <div className="gutter">
        <div className="description">{desc}</div>
      </div>
      <div className="flex m-top">
        <div className="col-3">
          <Production>
            <div className="flex">
              <div className="col-1">&ndash;</div>
              <Resource name="power" />
              <Resource name="power" />
            </div>
            <div className="flex">
              <div className="col-1">+</div>
              <MegaCredit value="5" />
              <Resource name="blank" />
            </div>
          </Production>
          <div className="inline-block valign-top">
            <div className="resources" style={{ verticalAlign: 'top' }}>
              <Tile name="capital city" />
            </div>
          </div>
        </div>
        <div className="col-1 bottom">
          <VictoryPoint>
            <span>
              <span className="point">1</span>/<Tile name="ocean" />*
            </span>
          </VictoryPoint>
        </div>
      </div>
    </div>
  )
});
