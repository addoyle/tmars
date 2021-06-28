import React from 'react';
import Active from '../Active';
import {
  Production,
  Resource,
  MegaCredit,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Add 1 animal to this card.';
const desc =
  'Requires 9% oxygen. Decrease your plant production 1 step and increase your M€ production 2 steps. 1 VP for each animal on this card.';

const card = new Active({
  number: '184',
  title: 'Livestock',
  cost: 13,
  tags: ['animal'],
  restriction: {
    value: 9,
    param: 'oxygen'
  },
  activeDesc,
  desc,
  resource: 'animal',
  flavor: 'Providing meat, wood, leather, etc.',
  production: {
    plant: -1,
    megacredit: 2
  },
  actions: [
    {
      name: 'Add 1 Animal',
      log: ['add an animal ', { resource: 'animal' }],
      icon: <Resource name="animal" />,
      action: (player, game) => game.cardResource(player, card, 1)
    }
  ],
  vp: (player, game) => game.cardResource(player, card),
  emoji: '🐄',
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
      <div className="col-1">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="plant" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <MegaCredit value="2" />
          </div>
        </Production>
      </div>
      <div className="col-2 middle description">{desc}</div>
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
