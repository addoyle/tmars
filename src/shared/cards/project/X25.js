import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Effect: When you gain an animal to ANY CARD, gain 2 M€.';

const card = new Active({
  number: 'X25',
  title: 'Meat Industry',
  cost: 5,
  tags: ['building'],
  set: 'promo',
  activeDesc,
  flavor: 'Meating the demands for high-protein foods',
  events: {
    onCardResource: (player, game, card, oldValue) => {
      if (
        card.resource === 'animal' &&
        game.cardResource(player, card) - oldValue > 0
      ) {
        game.resources(player, 'megacredit', 2);
      }
    }
  },
  emoji: '🥩',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Resource name="animal" />*
        <span className="arrow" />
        <MegaCredit value="2" />
      </div>
      <div className="description m-top text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});

export default card;
