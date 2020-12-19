import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  Tile
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase your heat production 4 steps. Place this tile ON AN AREA RESERVED FOR OCEAN.';
const customFilter = tile =>
  // Area reserved for ocean
  tile.attrs?.includes('reserved-ocean');

export default new Automated({
  number: '142',
  title: 'Mohole Area',
  cost: 20,
  tags: ['building'],
  desc,
  flavor: 'Tunnels deep down to the molten magma, releasing heat and gases',
  action: (player, game, done) => {
    game.production(player, 'heat', 4);
    game.promptTile(player, { special: 'mohole' }, done, customFilter);
  },
  canPlay: (player, game) => {
    const valid = !!game.findPossibleTiles(
      { special: 'mohole' },
      player,
      customFilter
    ).length;

    return {
      valid,
      msg: !valid ? 'No spaces reserved for ocean availble' : null
    };
  },
  emoji: '🕳',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <div>4</div>
            <Resource name="heat" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle text-center">
        <div className="resources">
          <Tile name="special" icon="mohole" asterisk />
        </div>
      </div>
      <div className="col-2 description middle">{desc}</div>
    </div>
  )
});
