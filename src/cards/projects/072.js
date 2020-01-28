import React from 'react';
import Active from '../../client/components/cards/Active';
import { Resource, Production, VictoryPoint } from '../../client/components/assets/Assets';

const top_desc = 'Action: Add an animal to this card.'
const desc = 'Requires 13% oxygen. Decrease any plant production 2 steps. 1 VP for each animal on this card.';

export default new Active({
  number: 72,
  title: 'Birds',
  cost: 10,
  tags: ['animal'],
  restriction: {
    value: 13,
    param: 'oxygen'
  },
  top_desc,
  desc,
  flavor: 'Bringing life to the skies',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🐦',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Resource name="animal" />
      </div>
      <div className="description text-center m-top">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-2 text-center">
        <Production>
          <div className="flex">
            <div>&ndash;</div>
            <Resource name="plant" anyone />
            <Resource name="plant" anyone />
          </div>
        </Production>
        <div className="middle description">{desc}</div>
      </div>
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
