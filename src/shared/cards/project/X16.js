import React from 'react';
import Active from '../Active';
import { Resource, Tile } from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 1 titanium to add 1 asteroid resource to ANY card or remove 1 asteroid here to place an ocean tile.';

const card = new Active({
  number: 'X16',
  title: 'Comet Aiming',
  cost: 17,
  tags: ['space'],
  set: 'promo',
  activeDesc,
  resource: 'asteroid',
  flavor: 'Bringing new meaning to ‘shooting stars’',
  actions: [
    {
      name: 'Spend 1 Titanium',
      icon: <Resource name="titanium" />,
      canPlay: player => {
        const valid = player.resources.titanium >= 1;
        return {
          valid,
          msg: 'Not enough titanium'
        };
      },
      action: (player, game) => {
        game.resources(player, 'titanium', -1);
        game.cardResource(player, card, 1);
      }
    },
    {
      name: 'Spend 1 Asteroid',
      icon: <Resource name="asteroid" />,
      canPlay: (player, game) => {
        const valid = game.cardResource(player, card) >= 1;
        return {
          valid,
          msg: 'Not enough asteroids'
        };
      },
      action: (player, game, done) => {
        game.cardResource(player, card, -1);
        game.promptTile(player, 'ocean', done);
      }
    }
  ],
  vp: 1,
  emoji: '🎯',
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell" />
          <div className="cell middle resources text-center">
            <Resource name="titanium" />
            <span className="arrow" />
          </div>
          <div className="cell middle resources text-center">
            <Resource name="asteroid" />*
          </div>
        </div>
        <div className="row">
          <div className="cell middle resources">
            <span>OR</span>
          </div>
          <div className="cell middle resources text-center">
            <Resource name="asteroid" />
            <span className="arrow" />
          </div>
          <div className="cell middle resources">
            <Tile name="ocean" />
          </div>
        </div>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});

export default card;
