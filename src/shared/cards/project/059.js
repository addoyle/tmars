import React from 'react';
import Automated from '../Automated';
import {
  Tile,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires +4°C or warmer. Place a greenery tile ON AN AREA RESERVED FOR OCEAN and raise oxygen 1 step. Disregard normal placement restrictions for this.';

export default new Automated({
  number: '059',
  title: 'Mangrove',
  cost: 12,
  tags: ['plant'],
  restriction: {
    value: 4,
    param: 'temperature'
  },
  desc,
  flavor:
    'A wetland forest will create an ecosystem where new species can thrive',
  tile: {
    tile: 'greenery',
    filter: tile =>
      // Area reserved for ocean
      tile.attrs?.includes('reserved-ocean')
  },
  vp: 1,
  emoji: '🌳',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <div className="resources">
          <Tile name="greenery" asterisk />
        </div>
      </div>
      <div className="col-3 middle description">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
