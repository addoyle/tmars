import React from 'react';
import Active from '../../client/components/cards/Active';
import { Tag, Resource, Production, MegaCredit } from '../../client/components/assets/Assets';

const top_desc = 'Effect: When you play a space card, you pay 2 M€ less for it.';
const desc = 'Requires 5 science tags. Increase your energy production 6 steps.';

export default new Active({
  number: 94,
  title: 'Mass Converter',
  cost: 8,
  tags: ['science', 'power'],
  set: 'corporate',
  restriction: {
    value: 5,
    tag: 'science'
  },
  top_desc,
  desc,
  flavor: 'E=mc². 1 kg = a LOT of energy',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🎆',
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
            <div>
              <span>6</span>
              <Resource name="power" />
            </div>
          </div>
        </Production>
      </div>
      <div className="col-2 middle description">{desc}</div>
    </div>
  )
});
