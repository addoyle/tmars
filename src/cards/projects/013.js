import React from 'react';
import Active from '../../components/Active';
import Resource from '../../components/assets/Resource';
import MegaCredit from '../../components/assets/MegaCredit';
import VictoryPoint from '../../components/assets/VictoryPoint';
import Production from '../../components/assets/Production';

const top_desc = 'Action: Spend 1 steel to gain 5 M€';
const desc = 'Increase your titanium production 1 step.';

export default new Active({
  number: 13,
  title: 'Space Elevator',
  cost: 27,
  tags: ['space', 'building'],
  set: 'corporate',
  top_desc,
  desc,
  flavor: 'An ultra-strong cable car up to geo-stationary orbit, enabling reasonable export costs',
  clientAction: game => {},
  serverAction: game => {},
  clientActiveAction: game => {},
  serverActiveAction: game => {},
  vp: 2,
  emoji: '🚠',
  activeLayout: (
    <div>
      <div className="center text-center">
        <div className="resources">
          <Resource name="steel" /> <span className="arrow" /> <MegaCredit value="5" />
        </div>
        <div className="description text-center">{top_desc}</div>
      </div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <Production><Resource name="titanium" /></Production>
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
