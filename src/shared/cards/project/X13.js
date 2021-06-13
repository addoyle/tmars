import React from 'react';
import Active from '../Active';
import {
  MegaCredit,
  Param,
  Production
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Effect: When you play a card with a basic cost of 20 M€ or more, increase your M€ production 1 step.';

const card = new Active({
  number: 'X13',
  title: 'Advertising',
  cost: 4,
  tags: ['earth'],
  set: 'promo',
  activeDesc,
  flavor: 'Big projects make big headlines',
  events: {
    onAnyCardPlayed: (player, game, playedCard) =>
      // Has a base cost of 20 or more
      playedCard.cost >= 20 &&
      // Bump M€ production
      game.production(player, 'megacredit', 1)
  },
  emoji: '📺',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Param name="card back" megacredit={20} />
        <span>:</span>
        <Production>
          <div className="flex">
            <MegaCredit value="1" />
          </div>
        </Production>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});

export default card;
