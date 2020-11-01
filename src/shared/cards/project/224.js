import React from 'react';
import Active from '../Active';
import {
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Add 1 microbe to ANY card.';
const desc = 'Requires 2 science tags. 1 VP per 3 microbes on this card.';

export default new Active({
  number: 224,
  title: 'Extremophiles',
  cost: 3,
  tags: ['venus', 'microbe'],
  set: 'venus',
  restriction: {
    value: 2,
    tag: 'science'
  },
  activeDesc,
  desc,
  flavor: 'Surviving even on the surface of Venus',
  action: () => {},
  emoji: '🧊',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Resource name="microbe" />*
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-3 description middle text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/3
            <Resource name="microbe" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
