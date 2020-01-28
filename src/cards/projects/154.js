import React from 'react';
import Active from '../../client/components/cards/Active';
import { Resource } from '../../client/components/assets/Assets';

const top_desc = 'Action: Spend 8 heat to increase your terraform rating 1 step.';
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
  top_desc,
  desc,
  flavor: 'In charge of establishing comfortable temperatures',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '📝',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span>8</span>
        <Resource name="heat" />
        <span className="arrow" />
        <Resource name="tr" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="description text-center m-top m-bottom">{desc}</div>
  )
});
