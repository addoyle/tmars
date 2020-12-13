import React from 'react';
import Active from '../Active';
import {
  MegaCredit,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Effect: When you play a card, you pay 2 M€ less for it.';
const desc = 'Requires 7 science tags.';

export default new Active({
  number: 150,
  title: 'Anti-Gravity Technology',
  cost: 14,
  tags: ['science'],
  set: 'corporate',
  restriction: {
    value: 7,
    tag: 'science'
  },
  activeDesc,
  desc,
  flavor:
    'Finally successful, anti-gravity will revolutionize everything, from households to industry and space travel',
  action: () => {},
  vp: 3,
  emoji: '🕴',
  todo: true,
  activeLayout: (
    <div>
      <div className="resources text-center">
        :<MegaCredit value="-2" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-3 description text-center middle">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">3</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
