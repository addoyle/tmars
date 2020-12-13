import React from 'react';
import Active from '../Active';
import {
  MegaCredit,
  Tile
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Effect: When you play a card, you pay 1 M€ less for it.';
const desc = 'Place a city tile NEXT TO NO OTHER TILE.';

const customFilter = (tile, game, notReserved, neighbors) =>
  // Not reserved
  notReserved(tile) &&
  // No neighbors
  !neighbors.filter(t => t.name).length;

export default new Active({
  number: 20,
  title: 'Research Outpost',
  cost: 18,
  tags: ['science', 'city', 'building'],
  desc,
  flavor: 'Finding new ways to do things',
  action: (player, game, done) => {
    game.promptTile(player, 'city', done, customFilter);
  },
  canPlay: (player, game) => {
    const valid = !!game.findPossibleTiles('city', player, customFilter).length;

    return {
      valid,
      msg: !valid ? 'No spaces exist that are next to no other tile' : null
    };
  },
  emoji: '🏢',
  activeLayout: (
    <div>
      <div className="resources text-center">
        :<MegaCredit value="-1" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-1 resources">
        <Tile name="city" asterisk />
      </div>
      <div className="col-3 description text-center middle">{desc}</div>
    </div>
  )
});
