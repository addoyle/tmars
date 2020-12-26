import React from 'react';
import Active from '../Active';
import {
  Tag,
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Effect: When you play an animal, plant, or microbe tag, including this, add a microbe to this card.';
const desc = 'Requires 3% oxygen. 1 VP per 3 microbes on this card.';

const card = new Active({
  number: '131',
  title: 'Decomposers',
  cost: 5,
  tags: ['microbe'],
  restriction: {
    value: 3,
    param: 'oxygen'
  },
  activeDesc,
  desc,
  resource: 'microbe',
  flavor: 'Decomposing dead organisms is essential to making sustainable soil',
  events: {
    onCardPlayed: (player, game, card) =>
      // Has a space, plant, or microbe tag
      (card.tags.includes('animal') ||
        card.tags.includes('plant') ||
        card.tags.includes('microbe')) &&
      game.cardResource(player, card, 1)
  },
  vp: (player, game) => Math.floor(game.cardResource(player, card) / 3),
  emoji: '🍄',
  activeLayout: (
    <div className="text-center">
      <div className="resources">
        <Tag name="animal" />/<Tag name="plant" />/<Tag name="microbe" />:
        <Resource name="microbe" />
      </div>
      <div className="description">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-3 description middle text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/3
            <Resource name="microbe" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});

export default card;
