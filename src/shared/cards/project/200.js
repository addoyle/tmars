import React from 'react';
import Active from '../Active';
import {
  Tile,
  Production,
  Resource,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Effect: Each time a city tile is placed, including this, increase your M€ production 1 step.';
const desc =
  'Decrease your energy production 1 step and decrease your M€ production 2 steps. Place a city tile.';

export default new Active({
  number: '200',
  title: 'Immigrant City',
  cost: 13,
  tags: ['city', 'building'],
  activeDesc,
  desc,
  flavor:
    'Taking care of immigrants is costly, but will begin to pay off when they start working for you in the growing society',
  action: (player, game, done) => {
    game.production(player, 'power', -1);
    game.production(player, 'megacredit', -2);
    game.promptTile(player, 'city', done);
  },
  production: {
    power: -1,
    megacredit: -2
  },
  tile: 'city',
  events: {
    onAnyTile: (player, game, tile) =>
      // Is a city
      ['city', 'capital city'].includes(tile.type) &&
      // Bump production
      game.production(player, 'megacredit', 1)
  },
  emoji: '🌃',
  activeLayout: (
    <div>
      <div className="flex center gutter">
        <div className="resources middle">
          <Tile name="city" anyone />:
        </div>
        <div className="middle">
          <Production>
            <div className="flex">
              <MegaCredit value="1" />
            </div>
          </Production>
        </div>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="middle">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
            <MegaCredit value="-2" />
          </div>
        </Production>
      </div>
      <div className="middle">
        <div className="resources">
          <Tile name="city" />
        </div>
      </div>
      <div className="description">{desc}</div>
    </div>
  )
});
