import React from 'react';
import Active from '../Active';
import { Resource } from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Spend 8 heat to increase your terraform rating 1 step.';
const desc = 'Requires 0°C or warmer.';

export default new Active({
  number: 154,
  title: 'Caretaker Contract',
  cost: 3,
  tags: [],
  set: 'corporate',
  restriction: {
    value: 0,
    param: 'temperature'
  },
  activeDesc,
  desc,
  flavor: 'In charge of establishing comfortable temperatures',
  action: () => {},
  emoji: '📝',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span>8</span>
        <Resource name="heat" />
        <span className="arrow" />
        <Resource name="tr" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div className="description text-center m-top m-bottom">{desc}</div>
});
