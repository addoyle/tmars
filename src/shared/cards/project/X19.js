import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit,
  Param
} from '../../../client/game/components/assets/Assets';

// TODO action

const activeDesc =
  'Action: Spend 6 M€ to add 1 asteroid to ANY CARD (titanium may be used to pay for this), or remove 1 asteroid here to raise temperature 1 step.';

const card = new Active({
  number: 'X19',
  title: 'Directed Impactors',
  cost: 8,
  tags: ['space'],
  set: 'promo',
  activeDesc,
  resource: 'asteroid',
  flavor: 'Pushing asteroids towards Mars, delivering huge amounts of heat',
  actions: [
    {
      name: 'Add 1 asteroid',
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
      resources: {
        megacredit: (player, game, count) =>
          -Math.max(0, 6 - count * player.rates.titanium),
        titanium: (player, game, count) => -count,
        asteroid: 1
      }
    },
    {
      name: 'Raise Temperature',
      log: ['raise temperature', { param: 'temperature' }],
      icon: (
        <>
          <Resource name="asteroid" />
          <span className="arrow" />
          <Param name="temperature" />
        </>
      ),
      cardResource: -1,
      param: ['temperature']
    }
  ],
  emoji: '🥊',
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell" />
          <div className="cell middle resources text-center">
            <MegaCredit value="6" />
            <span className="sup">
              (<Resource name="titanium" />)
            </span>
          </div>
          <div className="cell middle resources">
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
          </div>
          <div className="cell middle resources">
            <span className="arrow" />
          </div>
          <div className="cell middle resources text-center">
            <Param name="temperature" />
          </div>
        </div>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});

export default card;
