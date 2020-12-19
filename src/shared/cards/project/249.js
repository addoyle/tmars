import React from 'react';
import Active from '../Active';
import {
  Resource,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Add 1 animal to this card.';
const desc =
  'Requires Venus 12%, and that you spend 1 floater from any card. 1 VP for each animal on this card.';

export default new Active({
  number: '249',
  title: 'Stratospheric Birds',
  cost: 12,
  tags: ['venus', 'animal'],
  set: 'venus',
  restriction: {
    value: 12,
    param: 'venus'
  },
  activeDesc,
  desc,
  flavor:
    'Living in the thick air, nesting on man-made structures, far away from the furnace at ground level',
  action: () => {
    // TODO figure out how to remove floater
  },
  vp: () => this.resources,
  emoji: '🦅',
  todo: true,
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Resource name="animal" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="resources">
          &ndash;
          <Resource name="floater" />
        </div>
      </div>
      <div className="col-2 description middle">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/
            <Resource name="animal" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
