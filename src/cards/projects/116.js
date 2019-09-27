import React from 'react';
import Automated from '../../client/components/Automated';
import { Production, MegaCredit, Resource, Tile, VictoryPoint } from '../../client/components/assets/Assets';

const desc = 'Requires -6°C or warmer. Place 1 ocean tile ON AN AREA NOT RESERVED FOR OCEAN.';

export default new Automated({
  number: 116,
  title: 'Artificial Lake',
  cost: 15,
  tags: ['building'],
  restriction: {
    value: -6,
    param: 'temperature'
  },
  desc,
  flavor: '[TODO]',
  clientAction: game => {},
  serverAction: game => {},
  vp: 1,
  emoji: '🦆',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle resources">
        <Tile name="ocean" asterisk />
      </div>
      <div className="description middle col-3">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
