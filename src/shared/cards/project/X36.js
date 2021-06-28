import React from 'react';
import Active from '../Active';
import { Resource } from '../../../client/game/components/assets/Assets';

// TODO action

const activeDesc =
  'Action: Spend 2 energy to gain 2 plants OR to add 1 animal to ANOTHER card.';

const card = new Active({
  number: 'X36',
  title: 'Bio Printing Facility',
  cost: 7,
  tags: ['building'],
  set: 'promo',
  activeDesc,
  resource: 'asteroid',
  flavor: 'Introducing new species on demand',
  actions: [
    {
      name: 'Spend 2 Energy',
      icon: (
        <>
          <Resource name="power" />
          <Resource name="power" />
        </>
      ),
      action: (player, game) => {
        game.resources(
          player,
          'megacredit',
          Math.min(game.cardResource(player, card), 5)
        );
        game.cardResource(player, card, -1);
      }
    }
  ],
  vp: 1,
  emoji: '🖨️',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Resource name="power" />
        <Resource name="power" />
        <span className="arrow" />
        <Resource name="plant" />
        <Resource name="plant" />
        <span>OR</span>
        <Resource name="animal" />*
      </div>
      <div className="description text-center m-top">{activeDesc}</div>
    </div>
  ),
  layout: <div />
});

export default card;
