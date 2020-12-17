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

export default new Active({
  number: 243,
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
  flavor:
    'Using the oblique angle to increase global rotation and thus decrease day length',
  emoji: '🪨',
  todo: true,
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
