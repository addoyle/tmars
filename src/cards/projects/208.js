import React from 'react';
import Active from '../../client/components/cards/Active';
import { Param, Production, Resource, VictoryPoint } from '../../client/components/assets/Assets';

const top_desc = 'Action: Draw 2 cards.';
const desc = 'Requires 3 science tags to play. Decrease your energy production 1 step.';

export default new Active({
  number: 208,
  title: 'AI Central',
  cost: 21,
  tags: ['science', 'building'],
  set: 'corporate',
  restriction: {
    value: 3,
    tag: 'science'
  },
  top_desc,
  flavor: '"42"',
  clientAction: game => {},
  serverAction: game => {},
  vp: 1,
  emoji: '🖥️',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Param name="card back" />
        <Param name="card back" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="middle">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-2 description middle text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
