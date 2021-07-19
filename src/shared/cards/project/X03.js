import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit,
  Production
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 2X M€ to gain X energy, or decrease energy production 1 step to gain 8 M€.';

export default new Active({
  number: 'X03',
  title: 'Energy Market',
  cost: 3,
  tags: ['power'],
  set: 'promo',
  activeDesc,
  flavor:
    'Coordinating the supply and demand of energy gives you a flexible position',
  actions: [
    {
      name: 'Convert M€ to Energy',
      icon: <Resource name="power" />,
      counter: {
        name: 'Use M€',
        max: player => Math.floor(player.resources.megacredit / 2),
        icon: <Resource name="power" />,
        resultIcon: count => <MegaCredit value={count * 2} />
      },
      canPlay: player => {
        const valid = player.resources.megacredit >= 2;
        return {
          valid,
          msg: !valid ? 'Requires at least 2 M€' : null
        };
      },
      resources: {
        megacredit: (player, game, { count }) => -(count * 2),
        power: (player, game, { count }) => count
      }
    },
    {
      name: 'Spend Enery Production',
      icon: (
        <Production>
          <div className="flex">
            <Resource name="power" />
          </div>
        </Production>
      ),
      production: {
        power: -1
      },
      resources: {
        megacredit: 8
      }
    }
  ],
  emoji: '🏦',
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell middle"></div>
          <div className="cell middle resources text-center">
            <MegaCredit value="2X" />
          </div>
          <div className="cell middle resources">
            <div>
              <span className="arrow" />
            </div>
          </div>
          <div className="cell middle resources text-right">
            <span>X</span>
            <Resource name="power" />
          </div>
        </div>
        <div className="row">
          <div className="cell middle resources">
            <span>OR</span>
          </div>
          <div className="cell middle resources">
            <Production>
              <div className="flex">
                <Resource name="power" />
              </div>
            </Production>
          </div>
          <div className="cell middle resources">
            <div>
              <span className="arrow" />
            </div>
          </div>
          <div className="cell middle resources text-right">
            <div>
              <MegaCredit value="8" />
            </div>
          </div>
        </div>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});
