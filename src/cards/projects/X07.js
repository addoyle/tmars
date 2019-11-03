import React from 'react';
import Active from '../../client/components/Active';
import { Resource, MegaCredit } from '../../client/components/assets/Assets';

const top_desc = 'Effect: Your titanium resources are worth 1 M€ extra.';
const desc = 'Requires 2 science tags.';

export default new Active({
  number: 'X07',
  title: 'Mercurian Alloys',
  cost: 3,
  tags: ['space'],
  set: 'promo',
  restriction: {
    value: 2,
    tag: 'science'
  },
  top_desc,
  desc,
  flavor: 'Studying the natural alloys of the Mercurian ground has led to a breakthrough in materials science',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🔩',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Resource name="titanium" />: <span>+</span><MegaCredit value="1" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="description m-top m-bottom text-center">{desc}</div>
  )
});
