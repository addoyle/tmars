import React from 'react';
import Active from '../Active';
import { Resource, Param } from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 1 titanium to add 2 floaters to this card, or remove 2 floaters here to raise Venus 1 step.';

const card = new Active({
  number: '234',
  title: 'Jet Stream Microscrappers',
  cost: 12,
  tags: ['venus'],
  set: 'venus',
  activeDesc,
  resource: 'floater',
  flavor: 'Released in millions to remove unwanted gases',
  actions: [
    {
      name: 'Add 2 Floaters',
      log: ['add 2 floaters ', { resource: 'floater' }],
      icon: <Resource name="titanium" />,
      canPlay: player => {
        const valid = player.resources.titanium >= 1;
        return {
          valid,
          msg: !valid ? 'Not enough titanium' : null
        };
      },
      action: (player, game) => {
        game.resources(player, 'titanium', -1);
        game.cardResource(player, card, 2);
      }
    },
    {
      name: 'Raise Venus',
      log: ['raise Venus ', { param: 'venus' }],
      icon: <Param name="venus" />,
      canPlay: (player, game) => {
        const valid = game.cardResource(player, card) >= 2;
        return {
          valid,
          msg: !valid ? 'Not enough floaters' : null
        };
      },
      action: (player, game, done) => {
        game.cardResource(player, card, -2);
        game.param(player, 'venus', done);
      }
    }
  ],
  emoji: '🌪',
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell" />
          <div className="cell middle resources">
            <Resource name="titanium" />
            <span className="arrow" />
            <Resource name="floater" />
            <Resource name="floater" />
          </div>
        </div>
        <div className="row">
          <div className="cell middle resources text-right">
            <span>OR</span>
          </div>
          <div className="cell middle resources">
            <Resource name="floater" />
            <Resource name="floater" />
            <span className="arrow" />
            <Param name="venus" />
          </div>
        </div>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});

export default card;
