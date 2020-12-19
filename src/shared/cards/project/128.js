import React from 'react';
import Active from '../Active';
import {
  Tag,
  Resource,
  VictoryPoint,
  Tile
} from '../../../client/game/components/assets/Assets';

// TODO ACTION

const activeDesc =
  'Effect: When you play an animal or a plant tag (including these 2), add an animal to this card.';
const desc =
  'Requires that you have a greenery tile. Place this tile ADJACENT TO ANY GREENERY TILE. 1 VP per 2 animals on this card.';
const customFilter = (tile, game, notReserved, neighbors) =>
  // Not reserved
  notReserved(tile) &&
  // Is adjacent to one of your own tiles
  neighbors.filter(t => t.type === 'greenery').length;

export default new Active({
  number: '128',
  title: 'Ecological Zone',
  cost: 12,
  tags: ['animal', 'plant'],
  restriction: {
    value: 1,
    tile: 'greenery'
  },
  activeDesc,
  desc,
  flavor: 'A secluded area where a multitude of species develop an ecosystem',
  action: (player, game, done) =>
    game.promptTile(player, { special: 'animal' }, done, customFilter),
  canPlay: (player, game) => {
    const valid = !!game.findPossibleTiles(
      { special: 'animal' },
      player,
      customFilter
    ).length;

    return {
      valid,
      msg: !valid ? 'Requires a space adjacent to a greenery tile' : null
    };
  },
  vp: () => Math.floor(this.resources / 2),
  emoji: '🏞️',
  todo: true,
  activeLayout: (
    <div className="text-center">
      <div className="resources">
        <Tag name="animal" />/<Tag name="plant" />:<Resource name="animal" />
      </div>
      <div className="description">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="middle">
        <div className="resources">
          <Tile name="special" icon="animal" asterisk />
        </div>
      </div>
      <div className="col-3 description middle text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/2
            <Resource name="animal" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
