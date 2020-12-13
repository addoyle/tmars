import React from 'react';
import Automated from '../Automated';
import {
  VictoryPoint,
  Production,
  MegaCredit,
  Tile
} from '../../../client/game/components/assets/Assets';

// DONE

const desc =
  'Oxygen must be 4% or less. Place this tile NEXT TO NO OTHER TILE. Increase your M€ production 1 step.';
const customFilter = (tile, game, notReserved, neighbors) =>
  // Not reserved
  notReserved(tile) &&
  // No neighbors
  !neighbors.filter(t => t.name).length;

export default new Automated({
  number: 44,
  title: 'Natural Preserve',
  cost: 9,
  tags: ['science', 'building'],
  restriction: {
    max: true,
    value: 4,
    param: 'oxygen'
  },
  desc,
  flavor:
    'Creating a national park with original Martian landforms and environments',
  action: (player, game, done) => {
    game.promptTile(player, { special: 'mars' }, done, customFilter);
  },
  canPlay: (player, game) => {
    const valid = !!game.findPossibleTiles(
      { special: 'mars' },
      player,
      customFilter
    ).length;

    return {
      valid,
      msg: !valid ? 'No spaces exist that are next to no other tile' : null
    };
  },
  vp: 1,
  emoji: '🏜',
  layout: (
    <div className="flex">
      <div className="col-4 middle">
        <div className="flex center gutter">
          <div className="resources">
            <Tile name="special" icon="mars" asterisk />
          </div>
          <div className="middle">
            <Production>
              <div className="flex">
                <MegaCredit value="1" />
              </div>
            </Production>
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
