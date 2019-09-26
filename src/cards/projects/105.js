import React from 'react';
import Active from '../../client/components/Active';
import { Tag, MegaCredit } from '../../client/components/assets/Assets';

const top_desc = 'Effect: When you play an Earth tag, you pay 3 M€ less for it.';

export default new Active({
  number: 105,
  title: 'Earth Office',
  cost: 1,
  tags: ['earth'],
  set: 'corporate',
  top_desc,
  flavor: 'Coordinating deliveries and homeworld support',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🏙',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Tag name="earth" />:<MegaCredit value="-3" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div />
  )
});
