import React from 'react';
import Active from '../Active';
import {
  VictoryPoint,
  Param
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Draw a card.';
const desc = 'Requires 2 science tags.';

const card = new Active({
  number: 'X29',
  title: 'Sub-Crust Measurements',
  cost: 20,
  tags: ['earth', 'science', 'building'],
  set: 'promo',
  restriction: {
    value: 2,
    tag: 'science'
  },
  activeDesc,
  desc,
  flavor:
    'Direct observation of the mantle and core yields both surprises and insights in planetology',
  actions: [
    {
      name: 'Draw a card',
      icon: <Param name="card back" />,
      action: (player, game) => game.drawCard(player)
    }
  ],
  vp: 2,
  emoji: '🌡️',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Param name="card back" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-3 description middle text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});

export default card;
