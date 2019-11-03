import React from 'react';
import Automated from '../../client/components/Automated';
import { Tile, VictoryPoint, Tag } from '../../client/components/assets/Assets';

const desc = 'Place a city tile IN SPACE, outside and separate from the planet.';

export default new Automated({
  number: 'X12',
  title: 'Stanford Torus',
  cost: 12,
  tags: ['city', 'space'],
  set: 'promo',
  desc,
  flavor: 'A world of its own inside a giant space wheel, slowly rotating to create artificial gravity',
  clientAction: game => {},
  serverAction: game => {},
  vp: 1,
  emoji: '🍩',
  layout: (
    <div className="flex">
      <div className="col-1 middle">
        <div className="resources">
          <Tile name="city" asterisk />
        </div>
      </div>
      <div className="col-2 description middle">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
