import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit,
  Param
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 6 M€ to add an asteroid resource to this card (TITANIUM MAY BE USED), or spend a resource from this card to increase Venus 1 step.';
const desc = 'Venus must be 14% or lower.';

const card = new Active({
  number: '243',
  title: 'Rotator Impacts',
  cost: 6,
  tags: ['space'],
  set: 'venus',
  restriction: {
    value: 14,
    param: 'venus',
    max: true
  },
  activeDesc,
  desc,
  resource: 'asteroid',
  flavor:
    'Using the oblique angle to increase global rotation and thus decrease day length',
  actions: [
    {
      name: 'Add Asteroid',
      log: ['add an asteroid ', { resource: 'asteroid' }],
      icon: <Resource name="asteroid" />,
      counter: {
        name: 'Use Titanium',
        max: player =>
          Math.min(
            Math.ceil(6 / player.rates.titanium),
            player.resources.titanium
          ),
        icon: <Resource name="titanium" />,
        resultIcon: (count, player) => (
          <MegaCredit value={6 - count * player.rates.titanium} />
        )
      },
      canPlay: (player, game, count) => {
        const valid =
          player.resources.megacredit + count * player.rates.titanium >= 6;
        return {
          valid,
          msg: !valid ? 'Cannot afford this' : null
        };
      },
      action: (player, game, done, count) => {
        game.resources(
          player,
          'megacredit',
          -Math.max(0, 6 - count * player.rates.titanium)
        );
        game.resources(player, 'titanium', -count);
        game.cardResource(player, card, 1);
        done();
      }
    },
    {
      name: 'Raise Venus',
      log: ['raise Venus ', { param: 'venus' }],
      icon: <Param name="venus" />,
      canPlay: (player, game) => {
        const valid = game.cardResource(player, card) >= 1;
        return {
          valid,
          msg: !valid ? 'Not enough asteroids' : null
        };
      },
      action: (player, game, done) => {
        game.cardResource(player, card, -1);
        game.param(player, 'venus', done);
      }
    }
  ],
  emoji: '🪨',
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell" />
          <div className="cell middle resources">
            <MegaCredit value="6" />
            <span className="sup">
              (<Resource name="titanium" />)
            </span>
          </div>
          <div className="cell middle resources">
            <span className="arrow" />
          </div>
          <div className="cell middle resources text-center">
            <Resource name="asteroid" />
          </div>
        </div>
        <div className="row">
          <div className="cell middle resources">
            <span>OR</span>
          </div>
          <div className="cell middle resources">
            <Resource name="asteroid" />
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
  layout: <div className="description text-center m-top m-bottom">{desc}</div>
});

export default card;
