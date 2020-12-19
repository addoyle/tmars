import React from 'react';
import Active from '../Active';
import {
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

// TODO ACTION

const activeDesc = 'Action: Add 1 microbe to this card.';
const desc = '1 VP per 4 microbes on this card.';

const card = new Active({
  number: '049',
  title: 'Tardigrades',
  cost: 4,
  tags: ['microbe'],
  set: 'corporate',
  activeDesc,
  resource: 'microbe',
  desc,
  flavor:
    'These microscopic creatures can survive freezing, boiling, drying out, heavy radiation, and brute force',
  actions: [
    {
      name: 'Add 1 Microbe',
      icon: <Resource name="microbe" />,
      action: (player, game) => game.cardResource(player, card, 1)
    }
  ],
  vp: (player, game) => Math.floor(game.cardResource(player, card) / 4),
  emoji: '🐛',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Resource name="microbe" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-4 middle description text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/4
            <Resource name="microbe" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});

export default card;
