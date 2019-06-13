import React from 'react';
import Active from '../../client/components/Active';
import { Resource, VictoryPoint } from '../../client/components/assets/Assets';

const top_desc = 'Action: Spend 1 titanium to add 1 fighter resource to this card.';
const desc = '1 VP for each fighter resource on this card.';

export default new Active({
  number: 28,
  title: 'Security Fleet',
  cost: 12,
  tags: ['space'],
  set: 'corporate',
  top_desc,
  desc,
  flavor: 'Keeping the peace by force',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🚀',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Resource name="titanium" />
        <span className="arrow" />
        <Resource name="fighter" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-4 description text-center middle">{desc}</div>
      <div className="col-1">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/<Resource name="fighter" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
