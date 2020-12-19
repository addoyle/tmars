import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit,
  Production
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Add one floater to this card, or spend 1 floater here to raise your M€ production 1 step.';

export default new Active({
  number: '235',
  title: 'Local Shading',
  cost: 4,
  tags: ['venus'],
  set: 'venus',
  activeDesc,
  flavor: 'Providing temperate areas for rich costumers',
  action: () => {},
  emoji: '⛱',
  todo: true,
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell" />
          <div className="cell middle resources">
            <span className="arrow" />
          </div>
          <div className="cell middle resources text-center">
            <Resource name="floater" />
          </div>
        </div>
        <div className="row">
          <div className="cell middle resources">
            <span>OR</span>
            <Resource name="floater" />
          </div>
          <div className="cell middle resources">
            <span className="arrow" />
          </div>
          <div className="cell middle resources text-center">
            <Production>
              <div className="flex">
                <MegaCredit value="1" />
              </div>
            </Production>
          </div>
        </div>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});
