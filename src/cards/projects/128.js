import React from 'react';
import Active from '../../client/components/Active';
import { Tag, Resource, VictoryPoint, Tile } from '../../client/components/assets/Assets';

const top_desc = 'Effect: When you play an animal or a plant tag (including these 2), add an animal to this card.';
const desc = 'Requires that you have a greenery tile. Place this tile ADJACENT TO ANY GREENERY TILE. 1 VP per 2 animals on this card.';

export default new Active({
  number: 128,
  title: 'Ecological Zone',
  cost: 12,
  tags: ['animal', 'plant'],
  restriction: {
    value: 1,
    tile: 'greenery'
  },
  top_desc,
  desc,
  flavor: 'A secluded area where a multitude of species develop an ecosystem',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🏞️',
  activeLayout: (
    <div className="text-center">
      <div className="resources">
        <Tag name="animal" />/<Tag name="plant" />:<Resource name="animal" />
      </div>
      <div className="description">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="middle">
        <div className="resources">
          <Tile name="special" icon="factory" asterisk />
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
