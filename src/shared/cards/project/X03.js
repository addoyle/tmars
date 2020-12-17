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
  emoji: '🏦',
  todo: true,
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
