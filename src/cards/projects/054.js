import React from 'react';
import Active from '../../client/components/Active';
import { Resource, Production, VictoryPoint } from '../../client/components/assets/Assets';

const top_desc = 'Action: Add 1 animal to this card.';
const desc = 'Requires 6% oxygen. Decrease any plant production 1 step. 1 VP per 2 animals on this card.';

export default new Active({
  number: 54,
  title: 'Small Animals',
  cost: 6,
  tags: ['animal'],
  restriction: {
    value: 6,
    param: 'oxygen'
  },
  top_desc,
  desc,
  flavor: 'Able to live in sparse conditions',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🐀',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Resource name="animal" />
      </div>
      <div className="description text-center">{top_desc}</div>
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
            <span className="point">1</span>/2<Resource name="animal" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
