import React from 'react';
import Active from '../Active';
import {
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Add 1 animal to this card.';
const desc = 'Requires 8 oceans. 1 VP for each animal on this card.';

const card = new Active({
  number: '212',
  title: 'Penguins',
  cost: 7,
  tags: ['animal'],
  set: 'promo',
  restriction: {
    value: 8,
    tile: 'ocean'
  },
  activeDesc,
  desc,
  resource: 'animal',
  flavor:
    'Everybody loves penguins. And penguins love the new oceans and glaciers on Mars',
  actions: [
    {
      name: 'Add 1 Animal',
      log: ['add an animal ', { resource: 'animal' }],
      icon: <Resource name="animal" />,
      action: (player, game) => game.cardResource(player, card, 1)
    }
  ],
  vp: (player, game) => game.cardResource(player, card),
  emoji: '🐧',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Resource name="animal" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-3 description middle text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/<Resource name="animal" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});

export default card;
