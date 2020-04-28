import React from 'react';
import Active from '../Active';
import {
  Resource,
  VictoryPoint
} from '../../client/game/components/assets/Assets';

const activeDesc = 'Action: Add 1 animal to this card.';
const desc = 'Requires 8 oceans. 1 VP for each animal on this card.';

export default new Active({
  number: 212,
  title: 'Penguins',
  cost: 7,
  tags: ['animal'],
  set: 'promo',
  restriction: {
    value: 8,
    tile: 'ocean'
  },
  activeDesc,
  desc,
  flavor:
    'Everybody loves penguins. And penguins love the new oceans and glaciers on Mars',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🐧',
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
      <div className="col-3 description middle text-center">{desc}</div>
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
