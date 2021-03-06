import React from 'react';
import Active from '../Active';
import {
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

// TODO ACTION

const activeDesc =
  'Action: Remove 1 animal from any card and add it to this card.';
const desc = 'Requires 11% oxygen. 1 VP per animal on this card.';

const card = new Active({
  number: '024',
  title: 'Predators',
  cost: 14,
  tags: ['animal'],
  restriction: {
    value: 11,
    param: 'oxygen'
  },
  activeDesc,
  desc,
  flavor: 'Lions and tigers and bears, oh my',
  actions: [
    {
      name: 'Steal 1 Animal',
      icon: <Resource name="animal" any />,
      resources: {
        anyone: {
          animal: -1
        }
      },
      cardResource: 1
    }
  ],
  emoji: '🐻',
  vp: (player, game) => game.cardResource(player, card),
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Resource name="animal" anyone />
        <span className="arrow" />
        <Resource name="animal" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-4 description text-center middle">{desc}</div>
      <div className="col-1">
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
