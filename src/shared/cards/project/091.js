import React from 'react';
import Automated from '../Automated';
import {
  Production,
  MegaCredit,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc = 'Requires 3 science tags. Increase your M€ production 2 steps.';

export default new Automated({
  number: 91,
  title: 'Gene Repair',
  cost: 12,
  tags: ['science'],
  set: 'corporate',
  restriction: {
    value: 3,
    tag: 'science'
  },
  desc,
  flavor:
    'Counters the inevitable damage from cosmic radiation and reverses many aging symptoms',
  action: () => {},
  vp: 2,
  emoji: '🧬',
  layout: (
    <div className="flex gutter">
      <div className="col-3 text-center">
        <Production>
          <div className="flex">
            <MegaCredit value="2" />
          </div>
        </Production>
        <div className="description">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
