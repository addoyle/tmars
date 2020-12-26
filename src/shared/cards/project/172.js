import React from 'react';
import Active from '../Active';
import {
  Tile,
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

// TODO Block removal

const activeDesc =
  'Effect: When any city tile is placed, add an animal to this card.';
const desc = 'Add 1 animal to this card. 1 VP per 2 animals here.';

const card = new Active({
  number: '172',
  title: 'Pets',
  cost: 10,
  tags: ['earth', 'animal'],
  activeDesc,
  desc,
  resource: 'animal',
  flavor: 'It wouldn’t be the same without them',
  action: (player, game) => game.cardResource(player, card, 1),
  events: {
    onAnyTile: (player, game, tile) =>
      // Is a city
      ['city', 'capital city'].includes(tile.type) &&
      // Add an animal
      game.cardResource(player, card, 1)
  },
  vp: (player, game) => Math.floor(game.cardResource(player, card) / 2),
  emoji: '🐶️',
  todo: true,
  activeLayout: (
    <div>
      <div className="flex">
        <div className="col-2 middle text-center">
          <div className="resources">
            <Tile name="city" anyone />:<Resource name="animal" />
          </div>
        </div>
        <div className="col-3 text-center middle sans-serif">
          ANIMALS MAY NOT BE REMOVED FROM THIS CARD
        </div>
      </div>
      <div className="description text-center m-top">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="resources">
          <Resource name="animal" />
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
