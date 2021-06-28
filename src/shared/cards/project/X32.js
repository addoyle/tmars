import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  Tile,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires 4 ocean tiles. Increase your energy production 2 steps. Place this tile ADJACENT TO AN OCEAN TILE.';

export default new Automated({
  number: 'X32',
  replaces: '136',
  title: 'Great Dam',
  cost: 12,
  tags: ['power', 'building'],
  restriction: {
    value: 4,
    tile: 'ocean'
  },
  desc,
  flavor: 'Letting natural processes do the work',
  tile: {
    special: 'dam',
    filter: (tile, game, notReserved, neighbors) =>
      // Not reserved
      notReserved(tile) &&
      // Adjacent to an ocean
      neighbors.filter(t => t.type === 'ocean').length
  },
  production: {
    power: 2
  },
  vp: 1,
  emoji: '🌊',
  layout: (
    <div className="flex gutter">
      <div className="col-3">
        <div className="flex center">
          <Production>
            <div className="flex">
              <Resource name="power" />
              <Resource name="power" />
            </div>
          </Production>
          <div className="resources">
            <Tile name="special" icon="dam" asterisk />
          </div>
        </div>
        <div className="description text-center m-top">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
