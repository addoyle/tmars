import React from 'react';
import Automated from '../Automated';
import {
  Tile,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires +4°C or warmer. Place a greenery tile ON AN AREA RESERVED FOR OCEAN and raise oxygen 1 step. Disregard normal placement restrictions for this.';
const customFilter = tile =>
  // Area reserved for ocean
  tile.attrs?.includes('reserved-ocean');

export default new Automated({
  number: 59,
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
  action: (player, game, done) =>
    game.promptTile(player, 'greenery', done, customFilter),
  canPlay: (player, game) => {
    const valid = !!game.findPossibleTiles('greenery', player, customFilter)
      .length;

    return {
      valid,
      msg: !valid ? 'No areas reserved for ocean availble' : null
    };
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
