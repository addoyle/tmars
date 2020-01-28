import React from 'react';
import Active from '../../client/components/cards/Active';
import { Tag, MegaCredit } from '../../client/components/assets/Assets';

const top_desc = 'Effect: After you play an event card, you gain 3 M€.';

export default new Active({
  number: 109,
  title: 'Media Group',
  cost: 6,
  tags: ['earth'],
  set: 'corporate',
  top_desc,
  flavor: 'Profiting on every spectacular story',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🎙',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Tag name="event" />:<MegaCredit value="3" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div />
  )
});
