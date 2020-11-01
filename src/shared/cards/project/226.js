import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit,
  Param
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 2 M€ to add a floater to this card, or spend 2 floaters here to increase Venus 1 step.';

export default new Active({
  number: 226,
  title: 'Forced Precipitation',
  cost: 8,
  tags: ['venus'],
  set: 'venus',
  activeDesc,
  flavor:
    'Releasing aerosols that bind undesired gases, making them rain down to the surface',
  action: () => {},
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
