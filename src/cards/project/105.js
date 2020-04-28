import React from 'react';
import Active from '../Active';
import { Tag, MegaCredit } from '../../client/game/components/assets/Assets';

const activeDesc =
  'Effect: When you play an Earth tag, you pay 3 M€ less for it.';

export default new Active({
  number: 105,
  title: 'Earth Office',
  cost: 1,
  tags: ['earth'],
  set: 'corporate',
  activeDesc,
  flavor: 'Coordinating deliveries and homeworld support',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🏙',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Tag name="earth" />:<MegaCredit value="-3" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});
