import React from 'react';
import Active from '../Active';
import {
  Resource,
  Tile,
  Production,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Effect: When you place a greenery tile, add an animal to this card.';
const desc =
  'Requires 8% oxygen. Add 1 animal to this card. Decrease any plant production 1 step. 1 VP per 2 animals on this card.';

export default new Active({
  number: 147,
  title: 'Herbivores',
  cost: 12,
  tags: ['animal'],
  restriction: {
    value: 8,
    param: 'oxygen'
  },
  activeDesc,
  desc,
  flavor: 'Inhabiting the green hills of Mars',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🦌️',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Tile name="greenery" />:<Resource name="animal" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-2">
        <div className="resources text-center">
          <Resource name="animal" />
        </div>
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="plant" anyone />
          </div>
        </Production>
      </div>
      <div className="col-3 description">{desc}</div>
      <div className="col-2 bottom">
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
