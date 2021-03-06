import React from 'react';
import Active from '../Active';
import {
  Tag,
  Resource,
  VictoryPoint,
  Tile
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Effect: When you play an animal or a plant tag (including these 2), add an animal to this card.';
const desc =
  'Requires that you have a greenery tile. Place this tile ADJACENT TO ANY GREENERY TILE. 1 VP per 2 animals on this card.';

const card = new Active({
  number: '128',
  title: 'Ecological Zone',
  cost: 12,
  tags: ['animal', 'plant'],
  restriction: {
    value: 1,
    tile: 'greenery'
  },
  activeDesc,
  desc,
  resource: 'animal',
  flavor: 'A secluded area where a multitude of species develop an ecosystem',
  tile: {
    special: 'animal',
    filter: (tile, game, notReserved, neighbors) =>
      // Not reserved
      notReserved(tile) &&
      // Is adjacent to one of your own tiles
      neighbors.filter(t => t.type === 'greenery').length
  },
  events: {
    onCardPlayed: (player, game, playedCard) =>
      // Card has a plant or animal tag
      (playedCard.tags.includes('animal') ||
        playedCard.tags.includes('plant')) &&
      // Bump resource by the number of plant and animal tags
      game.cardResource(
        player,
        card,
        playedCard.tags.filter(tag => ['animal', 'plant'].includes(tag)).length
      )
  },
  vp: (player, game) => Math.floor(game.cardResource(player, card) / 2),
  emoji: '🏞️',
  activeLayout: (
    <div className="text-center">
      <div className="resources">
        <Tag name="animal" />/<Tag name="plant" />:<Resource name="animal" />
      </div>
      <div className="description">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="middle">
        <div className="resources">
          <Tile name="special" icon="animal" asterisk />
        </div>
      </div>
      <div className="col-3 description middle text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/2
            <Resource name="animal" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});

export default card;
