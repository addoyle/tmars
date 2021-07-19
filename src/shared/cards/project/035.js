import React from 'react';
import Active from '../Active';
import {
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

// TODO ACTION

const activeDesc =
  'Action: Remove 1 microbe from any card to add 1 to this card.';
const desc = 'Requires 4% oxygen. 1 VP per 2 microbes on this card.';

const card = new Active({
  number: '035',
  title: 'Ants',
  cost: 9,
  tags: ['microbe'],
  restriction: {
    value: 4,
    param: 'oxygen'
  },
  activeDesc,
  desc,
  flavor:
    'Although an important part of many ecosystems, ants can also be detrimental to their organisms',
  actions: [
    {
      name: 'Steal 1 Microbe',
      icon: <Resource name="microbe" any />,
      resources: {
        anyone: {
          microbe: -1
        }
      },
      cardResource: 1
    }
  ],
  emoji: '🐜',
  vp: (player, game) => Math.floor(game.cardResource(player, card) / 2),
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Resource name="microbe" anyone />
        <span className="arrow" />
        <Resource name="microbe" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-3 text-center description middle">{desc}</div>
      <div className="col-1">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/2
            <Resource name="microbe" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});

export default card;
