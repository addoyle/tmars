import React from 'react';
import Automated from '../Automated';
import { MegaCredit, Tag } from '../../../client/game/components/assets/Assets';

const desc = 'Gain 1 M€ for each event EVER PLAYED by all players.';

export default new Automated({
  number: 107,
  title: 'Media Archives',
  cost: 8,
  tags: ['earth'],
  set: 'corporate',
  desc,
  flavor:
    'Accessing information on past events for better planning of the future',
  action: () => {},
  emoji: '🗃️',
  todo: true,
  layout: (
    <div className="m-bottom">
      <div className="resources text-center">
        <MegaCredit value="1" />/<Tag name="event" anyone />
        <span>*</span>
      </div>
      <div className="description text-center">{desc}</div>
    </div>
  )
});
