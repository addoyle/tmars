import React from 'react';
import Automated from '../Automated';
import {
  Param,
  VictoryPoint
} from '../../client/game/components/assets/Assets';

const desc = 'Counts as playing 2 science cards. Draw 2 cards.';

export default new Automated({
  number: 90,
  title: 'Research',
  cost: 11,
  tags: ['science', 'science'],
  set: 'corporate',
  desc,
  flavor: 'Through technical excellence you will unlock many wondrous things',
  clientAction: () => {},
  serverAction: () => {},
  vp: 1,
  emoji: '‍🔬',
  layout: (
    <div className="flex gutter">
      <div className="col-3 text-center">
        <div className="resources">
          <Param name="card back" />
          <Param name="card back" />
        </div>
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
