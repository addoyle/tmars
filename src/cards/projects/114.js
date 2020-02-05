import React from 'react';
import Automated from '../Automated';
import { VictoryPoint } from '../../client/components/assets/Assets';

const desc = 'Requires 7% oxygen.';

export default new Automated({
  number: 114,
  title: 'Breathing Filters',
  cost: 11,
  tags: ['science'],
  restriction: {
    value: 7,
    param: 'oxygen'
  },
  desc,
  flavor: 'Allowing easy access to the still quite harsh environment',
  clientAction: game => {},
  serverAction: game => {},
  vp: 2,
  emoji: '😷',
  layout: (
    <div className="flex gutter">
      <div className="col-3 description middle text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
