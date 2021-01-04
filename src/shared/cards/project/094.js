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
  'Requires 5 science tags. Increase your energy production 6 steps.';

export default new Active({
  number: '094',
  title: 'Mass Converter',
  cost: 8,
  tags: ['science', 'power'],
  set: 'corporate',
  restriction: {
    value: 5,
    tag: 'science'
  },
  activeDesc,
  desc,
  flavor: 'E=mc². 1 kg = a LOT of energy',
  action: (player, game) => {
    game.production(player, 'power', 6);
    player.rates.cost.space = (player.rates.cost.space || 0) - 2;
  },
  emoji: '🎆',
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
