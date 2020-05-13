import React from 'react';
import Active from '../Active';
import {
  Resource,
  VictoryPoint,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Spend 2 M€ to add 1 floater to ANY card.';
const desc = 'Requires 2 science tags. 1 VP per 2 floaters on this card.';

export default new Active({
  number: 238,
  title: 'Floating Habs',
  cost: 5,
  tags: ['venus'],
  set: 'venus',
  restriction: {
    value: 2,
    tag: 'science'
  },
  activeDesc,
  desc,
  flavor: 'Living in the clouds',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🏡',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <MegaCredit value="2" />
        <span className="arrow" />
        <Resource name="floater" />*
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
            <span className="point">1</span>/2
            <Resource name="animal" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
