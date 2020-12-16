import React from 'react';
import Active from '../Active';
import { Tag, MegaCredit } from '../../../client/game/components/assets/Assets';

const activeDesc = 'Effect: After you play an event card, you gain 3 M€.';

export default new Active({
  number: 109,
  title: 'Media Group',
  cost: 6,
  tags: ['earth'],
  set: 'corporate',
  activeDesc,
  flavor: 'Profiting on every spectacular story',
  emoji: '🎙',
  todo: true,
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Tag name="event" />:<MegaCredit value="3" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});
