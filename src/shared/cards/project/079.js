import React from 'react';
import Active from '../Active';
import {
  Tag,
  Resource,
  Production,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Effect: When you play a space card, you pay 2 M€ less for it.';
const desc =
  'Requires 4 science tags. Increase your energy production 4 steps.';

export default new Active({
  number: '079',
  title: 'Quantum Extractor',
  cost: 13,
  tags: ['science', 'power'],
  set: 'corporate',
  restriction: {
    value: 4,
    tag: 'science'
  },
  activeDesc,
  desc,
  flavor: 'Tapping trhe very fabric of space',
  action: player =>
    (player.rates.cost.space = (player.rates.cost.space || 0) - 2),
  production: {
    power: 4
  },
  emoji: '🌟',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Tag name="space" />:<MegaCredit value="-2" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <div>
              <span>4</span>
              <Resource name="power" />
            </div>
          </div>
        </Production>
      </div>
      <div className="col-2 middle description">{desc}</div>
    </div>
  )
});
