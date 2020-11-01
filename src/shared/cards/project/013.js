import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit,
  VictoryPoint,
  Production
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Spend 1 steel to gain 5 M€';
const desc = 'Increase your titanium production 1 step.';

export default new Active({
  number: 13,
  title: 'Space Elevator',
  cost: 27,
  tags: ['space', 'building'],
  set: 'corporate',
  activeDesc,
  desc,
  flavor:
    'An ultra-strong cable car up to geo-stationary orbit, enabling reasonable export costs',
  action: () => {},
  clientActiveAction: () => {},
  serverActiveAction: () => {},
  vp: 2,
  emoji: '🚠',
  activeLayout: (
    <div>
      <div className="center text-center">
        <div className="resources">
          <Resource name="steel" />
          <span className="arrow" />
          <MegaCredit value="5" />
        </div>
        <div className="description text-center">{activeDesc}</div>
      </div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <Production>
          <Resource name="titanium" />
        </Production>
      </div>
      <div className="col-2 description middle">{desc}</div>
      <div className="col-1 middle">
        <VictoryPoint>
          <span className="point big">2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
