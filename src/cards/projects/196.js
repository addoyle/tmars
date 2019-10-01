import React from 'react';
import Automated from '../../client/components/Automated';
import { Param, VictoryPoint } from '../../client/components/assets/Assets';

const desc = 'Draw 1 card.';

export default new Automated({
  number: 196,
  title: 'Lagrange Observatory',
  cost: 9,
  tags: ['science', 'space'],
  set: 'corporate',
  desc,
  flavor: 'In a stationary orbit far from the planet, enabling very precise measurements',
  clientAction: game => {},
  serverAction: game => {},
  vp: 1,
  emoji: '🔭',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <div className="resources">
          <Param name="card back" />
        </div>
      </div>
      <div className="col-2 middle text-center">
        <div className="description">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
