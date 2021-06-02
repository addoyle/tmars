import React from 'react';
import Event from '../Event';
import {
  Resource,
  Param,
  Tile
} from '../../../client/game/components/assets/Assets';

const desc =
  'Raise temperature 3 steps. Place this tile ADJACENT TO NO CITY TILE. Gain 4 steel. Remove up to 6 plants from any player.';
const customFilter = (tile, game, notReserved, neighbors) =>
  // Not reserved
  notReserved(tile) &&
  // Not neighboring a city
  !neighbors.filter(t => ['city', 'capital city'].includes(t.type)).length;

export default new Event({
  number: 'X31',
  title: 'Deimos Down',
  cost: 31,
  tags: ['space', 'event'],
  desc,
  flavor: 'We don’t use that moon anyway',
  action: (player, game, done) =>
    game.promptTile(
      player,
      { special: 'deimos' },
      game.promptPlayer(
        player,
        'Pick a player to remove up to 6 plants',
        [p => ({ text: +p.resources.plant }), { resource: 'plant' }],
        ['took 6 plants ', { resource: 'plant' }, ' from'],
        targetPlayer => {
          targetPlayer && game.resources(targetPlayer, 'plant', -6);
          done();
        },
        player => player.resources.plant > 0,
        done
      ),
      customFilter
    ),
  canPlay: (player, game) => {
    const valid = !!game.findPossibleTiles(
      { special: 'deimos' },
      player,
      customFilter
    ).length;

    return {
      valid,
      msg: !valid ? 'Cannot place tile' : null
    };
  },
  param: ['temperature', 'temperature', 'temperature'],
  resources: {
    steel: 4
  },
  emoji: '☄',
  layout: (
    <div>
      <div className="table" style={{ width: '100%' }}>
        <div className="row text-center">
          <div className="cell resources">
            <Param name="temperature" />
            <Param name="temperature" />
            <Param name="temperature" />
          </div>
          <div className="cell resources">
            <Tile name="special" icon="deimos" asterisk />
          </div>
          <div className="cell resources">
            <span>4</span>
            <Resource name="steel" />
          </div>
          <div className="cell resources">
            <span>-6</span>
            <Resource name="plant" anyone />
          </div>
        </div>
      </div>
      <div className="text-center">
        <div className="description">{desc}</div>
      </div>
    </div>
  )
});
