import React from 'react';
import Active from '../Active';
import {
  Production,
  Resource,
  MegaCredit,
  Tile
} from '../../../client/game/components/assets/Assets';

// TODO ACTION

const activeDesc =
  'Action: Spend 7 M€ to increase your steel production 1 step.';
const desc = 'Place this tile ADJACENT TO A CITY TILE.';
const customFilter = (tile, game, notReserved, neighbors) =>
  // Not reserved
  notReserved(tile) &&
  // Is adjacent to one of your own tiles
  neighbors.filter(t => t.type === 'city').length;

export default new Active({
  number: 123,
  title: 'Industrial Center',
  cost: 4,
  tags: ['building'],
  set: 'corporate',
  activeDesc,
  desc,
  flavor:
    'Assigned to heavy industry, this area is not the nicest place on Mars',
  action: (player, game, done) =>
    game.promptTile(player, { special: 'factory' }, done, customFilter),
  canPlay: (player, game) => {
    const valid = !!game.findPossibleTiles(
      { special: 'factory' },
      player,
      customFilter(player)
    ).length;

    return {
      valid,
      msg: !valid ? 'Requires a space adjacent to a city tile' : null
    };
  },
  emoji: '🏭',
  todo: true,
  activeLayout: (
    <div className="text-center">
      <div className="resources">
        <MegaCredit value="7" />
        <span className="arrow" />
        <Production>
          <div className="flex">
            <Resource name="steel" />
          </div>
        </Production>
      </div>
      <div className="description">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-1 text-center">
        <div className="resources">
          <Tile name="special" icon="factory" />
        </div>
      </div>
      <div className="col-3 description middle text-center">{desc}</div>
    </div>
  )
});
