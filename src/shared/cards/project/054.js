import React from 'react';
import Active from '../Active';
import {
  Resource,
  Production,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Add 1 animal to this card.';
const desc =
  'Requires 6% oxygen. Decrease any plant production 1 step. 1 VP per 2 animals on this card.';

const card = new Active({
  number: '054',
  title: 'Small Animals',
  cost: 6,
  tags: ['animal'],
  restriction: {
    value: 6,
    param: 'oxygen'
  },
  activeDesc,
  desc,
  resource: 'animal',
  flavor: 'Able to live in sparse conditions',
  production: {
    anyone: {
      plant: -1
    }
  },
  actions: [
    {
      name: 'Add 1 Animal',
      log: ['add an animal ', { resource: 'animal' }],
      icon: <Resource name="animal" />,
      action: (player, game) => game.cardResource(player, card, 1)
    }
  ],
  vp: (player, game) => Math.floor(game.cardResource(player, card) / 2),
  emoji: '🐀',
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
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <div>&ndash;</div>
            <Resource name="plant" anyone />
          </div>
        </Production>
      </div>
      <div className="col-3 middle description">{desc}</div>
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
