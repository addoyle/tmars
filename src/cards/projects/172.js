import React from 'react';
import Active from '../../client/components/Active';
import { Tile, Resource, VictoryPoint } from '../../client/components/assets/Assets';

const top_desc = 'Effect: When any city tile is placed, add an animal to this card.';
const desc = 'Add 1 animal to this card. 1 VP per 2 animals here.';

export default new Active({
  number: 172,
  title: 'Pets',
  cost: 10,
  tags: ['earth', 'animal'],
  top_desc,
  desc,
  flavor: 'It wouldn\'t be the same without them',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🐶️',
  activeLayout: (
    <div>
      <div className="flex">
        <div className="col-2 middle text-center">
          <div className="resources">
            <Tile name="city" anyone />:<Resource name="animal" />
          </div>
        </div>
        <div className="col-3 text-center middle sans-serif">
          ANIMALS MAY NOT BE REMOVED FROM THIS CARD
        </div>
      </div>
      <div className="description text-center m-top">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="resources">
          <Resource name="animal" />
        </div>
      </div>
      <div className="col-3 description middle text-center">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/2<Resource name="animal" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});