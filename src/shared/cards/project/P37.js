import React from 'react';
import Automated from '../Automated';
import {
  Tile,
  Production,
  Resource,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your energy production 1 step. Increase your M€ production 2 steps. Place a city tile ON A VOLCANIC AREA, same as Lava Flows, regardless of adjacent cities.';

export default new Automated({
  number: 'P37',
  title: 'Lava Tube Settlement',
  cost: 15,
  tags: ['city', 'building'],
  set: 'prelude',
  desc,
  flavor:
    'Giant lava tubes can provide protection for early settlements on Mars',
  tile: {
    tile: 'city',
    filter: (tile, game, notReserved) =>
      // Not reserved
      notReserved(tile) &&
      // Is Hellas (no volcano spaces)
      (game.board.toLowerCase() === 'hellas' ||
        // Or is a volcanic area
        tile.attrs?.includes('volcano'))
  },
  production: {
    power: -1,
    megacredit: 2
  },
  emoji: '🚇',
  layout: (
    <div className="flex gutter">
      <div className="col-1 text-center">
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
        <div className="resources">
          <Tile name="city" asterisk />
        </div>
      </div>
      <div className="col-2 description middle">{desc}</div>
    </div>
  )
});
