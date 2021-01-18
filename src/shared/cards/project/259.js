import React from 'react';
import Active from '../Active';
import {
  VictoryPoint,
  Tag,
  Resource
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Effect: When you play a Science tag, including this, add 1 animal to this card.';
const desc = 'Requires Venus 18%. 1 VP for each animal on this card.';

const card = new Active({
  number: '259',
  title: 'Venusian Animals',
  cost: 15,
  tags: ['venus', 'science', 'animal'],
  set: 'venus',
  restriction: {
    value: 18,
    param: 'venus'
  },
  activeDesc,
  desc,
  resource: 'animal',
  flavor: 'Heavy genetic engineering is needed for this work',
  events: {
    onCardPlayed: (player, game, playedCard) =>
      // Card has a science tag
      playedCard.tags.includes('science') &&
      // Bump resource
      game.cardResource(
        player,
        card,
        playedCard.tags.filter(tag => tag === 'science').length
      )
  },
  vp: (player, game) => game.cardResource(player, card),
  emoji: '🦓',
  activeLayout: (
    <div className="text-center">
      <div className="resources">
        <Tag name="science" />:
        <Resource name="animal" />
      </div>
      <div className="description">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-4 description middle text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/
            <Resource name="animal" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});

export default card;
