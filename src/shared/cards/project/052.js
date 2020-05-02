import React from 'react';
import Active from '../Active';
import {
  Resource,
  Production,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Add 1 animal to this card.';
const desc =
  'Requires +2°C or warmer. Decrease any plant production 1 step. 1 VP for each animal on this card.';

export default new Active({
  number: 52,
  title: 'Fish',
  cost: 9,
  tags: ['animal'],
  restriction: {
    value: 2,
    param: 'temperature'
  },
  activeDesc,
  desc,
  flavor: 'Martian barracudas? Why not!',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🐟',
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
        <Production>
          <div className="flex">
            <div>&ndash;</div>
            <Resource name="plant" anyone />
          </div>
        </Production>
      </div>
      <div className="col-3 middle description">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/<Resource name="animal" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
