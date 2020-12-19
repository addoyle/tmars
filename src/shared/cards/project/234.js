import React from 'react';
import Active from '../Active';
import { Resource, Param } from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 1 titanium to add 2 floaters to this card, or remove 2 floaters here to raise Venus 1 step.';

export default new Active({
  number: '234',
  title: 'Jet Stream Microscrappers',
  cost: 12,
  tags: ['venus'],
  set: 'venus',
  activeDesc,
  flavor: 'Released in millions to remove unwanted gases',
  action: () => {},
  emoji: '🌪',
  todo: true,
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
