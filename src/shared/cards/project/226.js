import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit,
  Param
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 2 M€ to add a floater to this card, or spend 2 floaters here to increase Venus 1 step.';

const card = new Active({
  number: '226',
  title: 'Forced Precipitation',
  cost: 8,
  tags: ['venus'],
  set: 'venus',
  activeDesc,
  resource: 'floater',
  flavor:
    'Releasing aerosols that bind undesired gases, making them rain down to the surface',
  actions: [
    {
      name: 'Add 1 Floater',
      log: ['add a floater ', { resource: 'floater' }],
      icon: <MegaCredit value="2" />,
      canPlay: player => {
        const valid = player.resources.megacredit >= 2;
        return {
          valid,
          msg: !valid ? 'Not enough M€' : null
        };
      },
      action: (player, game) => {
        game.resources(player, 'megacredit', -2);
        game.cardResource(player, card, 1);
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
  emoji: '🌧',
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell middle resources text-right">
            <MegaCredit value="2" />
          </div>
          <div className="cell middle resources">
            <span className="arrow" />
          </div>
          <div className="cell middle resources text-center">
            <Resource name="floater" />
          </div>
        </div>
        <div className="row">
          <div className="cell middle resources text-right">
            <span>OR</span>
            <Resource name="floater" />
            <Resource name="floater" />
          </div>
          <div className="cell middle resources">
            <span className="arrow" />
          </div>
          <div className="cell middle resources text-center">
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
