import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Effect: When you gain a microbe to ANY CARD, also gain 1 M€.';
const desc = 'Gain 3 plants.';

const card = new Active({
  number: 'X30',
  title: 'Topsoil Contract',
  cost: 8,
  tags: ['earth', 'microbe'],
  set: 'promo',
  activeDesc,
  desc,
  flavor: 'Taking responsibility for preparing the ground for cultivation',
  resources: { plant: 3 },
  events: {
    onCardResource: (player, game, done, card, oldValue) => {
      if (
        card.resource === 'microbe' &&
        game.cardResource(player, card) - oldValue > 0
      ) {
        game.resources(player, 'megacredit', 1);
      }
    }
  },
  emoji: '🪴',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Resource name="microbe" />*<span>:</span>
        <MegaCredit value="1" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-1 middle text-center">
        <div className="resources">
          <Resource name="plant" />
          <Resource name="plant" />
          <Resource name="plant" />
        </div>
      </div>
      <div className="col-1 description middle">{desc}</div>
    </div>
  )
});

export default card;
