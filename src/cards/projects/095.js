import React from 'react';
import Active from '../../client/components/Active';
import { Resource, VictoryPoint } from '../../client/components/assets/Assets';

const top_desc = 'Action: Spend 6 energy to add a science resource to this card.';
const desc = '2 VP for each science resource on this card.';

export default new Active({
  number: 95,
  title: 'Physics Complex',
  cost: 12,
  tags: ['science', 'building'],
  set: 'corporate',
  top_desc,
  desc,
  flavor: 'This used to cause blackouts before the invention of supercapacitors',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '⚛️',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span>6</span>
        <Resource name="power" />
        <span className="arrow" />
        <Resource name="science" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-3 middle text-center description">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">2</span>/
            <Resource name="science" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});