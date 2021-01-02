import React from 'react';
import Automated from '../Automated';
import {
  Production,
  MegaCredit,
  Resource,
  Tile
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your energy production 1 step and increase your M€ production 2 steps. Place a city tile ADJACENT TO AT LEAST 2 OTHER CITY TILES.';
const customFilter = (tile, game, notReserved, neighbors) =>
  // Not reserved
  notReserved(tile) &&
  // Neighbors at least 2 cities
  neighbors.filter(t => t.type === 'city' || t.type === 'capital city')
    .length >= 2;

export default new Automated({
  number: '120',
  title: 'Urbanized Area',
  cost: 10,
  tags: ['city', 'building'],
  desc,
  flavor:
    'When the population begins to soar, cities will eventually merge into large urban areas',
  action: (player, game, done) => {
    game.production(player, 'power', -1);
    game.production(player, 'megacredit', 2);
    game.promptTile(player, 'city', done, customFilter);
  },
  canPlay: (player, game) => {
    if (player.production.power < 1) {
      return {
        valid: false,
        msg: 'Not enough energy production'
      };
    }

    const valid = !!game.findPossibleTiles('city', player, customFilter).length;
    return {
      valid,
      msg: !valid ? 'No spaces avilable with 2 neighboring cities' : null
    };
  },
  emoji: '🌃',
  layout: (
    <div className="flex gutter center">
      <div className="col-1 text-center middle">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <MegaCredit value="2" />
          </div>
        </Production>
      </div>
      <div className="middle">
        <div className="resources">
          <Tile name="city" asterisk />
        </div>
      </div>
      <div className="description text-center col-3">{desc}</div>
    </div>
  )
});
