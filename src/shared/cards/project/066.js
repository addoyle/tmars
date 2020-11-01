import React from 'react';
import Event from '../Event';

const desc =
  'PLACE YOUR MARKER ON A NON-RESERVED AREA. ONLY YOU MAY PLACE A TILE HERE';

export default new Event({
  number: 66,
  title: 'Land Claim',
  cost: 1,
  tags: ['event'],
  set: 'corporate',
  desc,
  flavor: 'Acquiring strategic land areas',
  action: () => {},
  emoji: '🚩',
  layout: (
    <div className="flex gutter">
      <div className="col-1"></div>
      <div className="col-8 text-center m-bottom">{desc}</div>
      <div className="col-1"></div>
    </div>
  )
});
