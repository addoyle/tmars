import React from 'react';
import Active from '../Active';
import {
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

// TODO ACTION

const activeDesc = 'Action: Add 1 microbe to this card.';
const desc = '1 VP per 4 microbes on this card.';

export default new Active({
  number: 49,
  title: 'Tardigrades',
  cost: 4,
  tags: ['microbe'],
  set: 'corporate',
  activeDesc,
  desc,
  flavor:
    'These microscopic creatures can survive freezing, boiling, drying out, heavy radiation, and brute force',
  action: () => {},
  emoji: '🐛',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Resource name="microbe" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-4 middle description text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/4
            <Resource name="microbe" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
