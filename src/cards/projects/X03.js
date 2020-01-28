import React from 'react';
import Active from '../../client/components/cards/Active';
import { Resource, MegaCredit, Production } from '../../client/components/assets/Assets';

const top_desc = 'Action: Spend 2X M€ to gain X energy, or decrease energy production 1 step to gain 8 M€.';

export default new Active({
  number: 'X03',
  title: 'Energy Market',
  cost: 3,
  tags: ['power'],
  set: 'promo',
  top_desc,
  flavor: 'Coordinating the supply and demand of energy gives you a flexible position',
  clientAction: game => {},
  serverAction: game => {},
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
            <div><span className="arrow" /></div>
          </div>
          <div className="cell middle resources text-right">
            <span>X</span><Resource name="power" />
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
            <div><span className="arrow" /></div>
          </div>
          <div className="cell middle resources text-right">
            <div><MegaCredit value="8" /></div>
          </div>
        </div>
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div />
  )
});
