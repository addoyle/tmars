import React from 'react';
import Active from '../Active';
import {
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Add 1 animal to this card.';
const desc =
  'Requires Venus 12%, and that you spend 1 floater from any card. 1 VP for each animal on this card.';

const card = new Active({
  number: '249',
  title: 'Stratospheric Birds',
  cost: 12,
  tags: ['venus', 'animal'],
  set: 'venus',
  restriction: {
    value: 12,
    param: 'venus'
  },
  activeDesc,
  desc,
  resource: 'animal',
  flavor:
    'Living in the thick air, nesting on man-made structures, far away from the furnace at ground level',
  action: () => {
    // TODO figure out how to remove floater
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
  emoji: '🦅',
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
        <div className="resources">
          &ndash;
          <Resource name="floater" />
        </div>
      </div>
      <div className="col-2 description middle">{desc}</div>
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
