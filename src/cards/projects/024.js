import React from 'react';
import Active from '../Active';
import { Resource, VictoryPoint } from '../../client/components/assets/Assets';

const activeDesc = 'Action: Remove 1 animal from any card and add it to this card.';
const desc = 'Requires 11% oxygen. 1 VP per animal on this card.';

export default new Active({
  number: 24,
  title: 'Predators',
  cost: 14,
  tags: ['animal'],
  restriction: {
    value: 11,
    param: 'oxygen'
  },
  activeDesc,
  desc,
  flavor: 'Lions and tigers and bears, oh my',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🐻',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Resource name="animal" anyone />
        <span className="arrow" />
        <Resource name="animal" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-4 description text-center middle">{desc}</div>
      <div className="col-1">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/<Resource name="animal" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
