import React from 'react';
import Active from '../../client/components/Active';
import { Tag, Resource, Production, MegaCredit } from '../../client/components/assets/Assets';

const top_desc = 'Effect: When you play a space card, you pay 2 M€ less for it.';
const desc = 'Requires 4 science tags. Increase your energy production 4 steps.';

export default new Active({
  number: 79,
  title: 'Quantum Extractor',
  cost: 13,
  tags: ['science', 'power'],
  set: 'corporate',
  restriction: {
    value: 4,
    tag: 'science'
  },
  top_desc,
  desc,
  flavor: 'Tapping trhe very fabric of space',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🌟',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Tag name="space" />:<MegaCredit value="-2" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <div>4</div>
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-2 middle description">{desc}</div>
    </div>
  )
});
