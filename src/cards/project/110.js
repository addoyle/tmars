import React from 'react';
import Active from '../Active';
import {
  Production,
  MegaCredit
} from '../../client/game/components/assets/Assets';

const activeDesc =
  'ACTION: LOOK AT THE TOP CARD AND EITHER BUY IT OR DISCARD IT';
const desc = 'Decrease your M€ production 1 step.';

export default new Active({
  number: 110,
  title: 'Business Network',
  cost: 4,
  tags: ['earth'],
  set: 'corporate',
  activeDesc,
  desc,
  flavor: 'Investing in social events can open up new opportunities',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🌐',
  activeLayout: (
    <div className="flex middle">
      <div className="col-1 resources">
        <div className="arrow" />
      </div>
      <div className="col-6">
        <strong>{activeDesc}</strong>
      </div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-2 text-center">
        <Production>
          <div className="flex">
            <MegaCredit value="-1" />
          </div>
        </Production>
      </div>
      <div className="col-3 description middle">{desc}</div>
    </div>
  )
});
