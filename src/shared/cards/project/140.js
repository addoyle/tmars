import React from 'react';
import Event from '../Event';
import {
  Param,
  Resource,
  Tile
} from '../../../client/game/components/assets/Assets';

const desc =
  'Raise temperature 2 steps and place this tile ON EITHER THARSIS THOLUS, ASCRAEUS MONS, PAVONIS MONS OR ARSIA MONS.';

export default new Event({
  number: 140,
  title: 'Lava Flows',
  cost: 18,
  tags: ['event'],
  desc,
  flavor:
    "Releasing tremendous lava flows from one of Mars' gargantuan volcanoes",
  action: (player, game, done) => {
    game.param(player, 'temperature');
    game.param(player, 'temperature');
    game.promptTile(
      player,
      { special: 'volcano' },
      done,
      (tile, game) =>
        game.board.toLowerCase() === 'hellas' || tile.attrs?.includes('volcano')
    );
  },
  canPlay: (player, game) => {
    const volcanos = game.field
      .flat()
      .filter(t => t.attrs?.includes('volcano'));
    const valid =
      // In the case of Hellas which has no volcanic areas, this tile can be placed anywhere
      !volcanos.length ||
      // Otherwise, it must be on a volcanic area (marked in Bold) that hasn't already been claimed
      !!volcanos.filter(t => !t.type).length;
    return {
      valid,
      msg: !valid ? 'No volcanic areas available' : null
    };
  },
  emoji: '🌋',
  layout: (
    <div className="text-center">
      <div className="col-1 resources text-center">
        <Param name="temperature" />
        <Param name="temperature" />
        <Resource name="blank" />
        <Tile name="special" icon="volcano" asterisk />
      </div>
      <div className="description text-center">{desc}</div>
    </div>
  )
});
