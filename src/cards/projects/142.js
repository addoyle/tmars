import React from 'react';
import Automated from '../../client/components/cards/Automated';
import { Production, Resource, Tile } from '../../client/components/assets/Assets';

const desc = 'Increase your heat production 4 steps. Place this tile ON AN AREA RESERVED FOR OCEAN.';

export default new Automated({
  number: 142,
  title: 'Mohole Area',
  cost: 20,
  tags: ['building'],
  desc,
  flavor: 'Tunnels deep down to the molten magma, releasing heat and gases',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🕳',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <div>4</div>
            <Resource name="heat" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle text-center">
        <div className="resources">
          <Tile name="special" icon="mohole" asterisk />
        </div>
      </div>
      <div className="col-2 description middle">{desc}</div>
    </div>
  )
});
