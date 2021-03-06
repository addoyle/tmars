import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  Tile
} from '../../../client/game/components/assets/Assets';

const desc =
  'Place this tile on an area with a steel or titanium placement bonus. Increase your production of that resource 1 step.';
const customFilter = (tile, game, notReserved) =>
  // Not reserved
  notReserved(tile) &&
  // Has either steel or titanium placement bonus
  (tile.resources?.includes('steel') || tile.resources?.includes('titanium'));

export default new Automated({
  number: '067',
  title: 'Mining Rights',
  cost: 9,
  tags: ['building'],
  desc,
  flavor: 'The battles for Martian riches sometimes begin in a courtroom',
  action: (player, game, done) =>
    game.promptTile(
      player,
      { special: 'mine' },
      t => {
        game.production(
          player,
          t.resources.includes('steel') ? 'steel' : 'titanium',
          1
        );
        done();
      },
      customFilter
    ),
  canPlay: (player, game) => {
    const valid = !!game.findPossibleTiles(
      { special: 'mine' },
      player,
      customFilter
    ).length;
    return {
      valid,
      msg: !valid
        ? 'Requires a space with a titanium/steel placement bonus'
        : null
    };
  },
  emoji: '⚖',
  layout: (
    <div className="flex gutter">
      <div className="col-3 middle">
        <div className="flex center">
          <div className="resources">
            <Tile name="special" icon="mine" asterisk />
          </div>
          <div>
            <Production>
              <div className="flex">
                <div>
                  <Resource name="steel" />
                  <span>&nbsp;OR&nbsp;</span>
                  <Resource name="titanium" />
                </div>
              </div>
            </Production>
          </div>
          <div className="resources">*</div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
    </div>
  )
});
