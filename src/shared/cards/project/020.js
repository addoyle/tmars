import React from 'react';
import Active from '../Active';
import {
  MegaCredit,
  Tile
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Effect: When you play a card, you pay 1 M€ less for it.';
const desc = 'Place a city tile NEXT TO NO OTHER TILE.';

export default new Active({
  number: '020',
  title: 'Research Outpost',
  cost: 18,
  tags: ['science', 'city', 'building'],
  desc,
  flavor: 'Finding new ways to do things',
  action: player => (player.rates.cost.all = (player.rates.cost.all || 0) - 1),
  tile: {
    tile: 'city',
    filter: (tile, game, notReserved, neighbors) =>
      // Not reserved
      notReserved(tile) &&
      // No neighbors
      !neighbors.some(t => t.name)
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
