import React from 'react';
import Automated from '../Automated';
import {
  Production,
  MegaCredit,
  Tile
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase your M€ production 2 steps. Place a greenery tile ON AN AREA RESERVED FOR OCEAN, disregarding normal placement restrictions, and increase oxygen 1 step.';
const customFilter = tile =>
  // Area reserved for ocean
  tile.attrs?.includes('reserved-ocean');

export default new Automated({
  number: '174',
  title: 'Protected Valley',
  cost: 23,
  tags: ['plant', 'building'],
  desc,
  flavor:
    'A fertile valley with higher air density and humidity, but in need of protection when the oceans rise',
  action: (player, game, done) =>
    game.promptTile(player, 'greenery', done, customFilter),
  production: {
    megacredit: 2
  },
  canPlay: (player, game) => {
    const valid = !!game.findPossibleTiles('greenery', player, customFilter)
      .length;

    return {
      valid,
      msg: !valid ? 'No spaces reserved for ocean availble' : null
    };
  },
  emoji: '🏞',
  layout: (
    <div className="text-center">
      <div className="flex gutter center">
        <div className="middle">
          <Production>
            <div className="flex">
              <MegaCredit value="2" />
            </div>
          </Production>
        </div>
        <div className="resources">
          <Tile name="greenery" asterisk />
        </div>
      </div>
      <div className="description">{desc}</div>
    </div>
  )
});
