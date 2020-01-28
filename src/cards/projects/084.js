import React from 'react';
import Automated from '../../client/components/cards/Automated';
import { VictoryPoint } from '../../client/components/assets/Assets';

export default new Automated({
  number: 84,
  title: 'Trans-Neptune Probe',
  cost: 6,
  tags: ['science', 'space'],
  flavor: 'Exploring the Kupier belt objects',
  clientAction: game => {},
  serverAction: game => {},
  vp: 1,
  emoji: '🛰',
  layout: (
    <div className="flex gutter">
      <div className="col-3"></div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
