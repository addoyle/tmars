import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  Tile
} from '../../client/game/components/assets/Assets';

const desc =
  'Increase your energy production 1 step for each city tile in play.';

export default new Automated({
  number: 189,
  title: 'Energy Saving',
  cost: 15,
  tags: ['power'],
  desc,
  flavor: 'Minimizing urban energy spending',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🔋',
  layout: (
    <div className="flex gutter m-bottom">
      <div className="middle text-center">
        <Production>
          <div className="flex">
            <Resource name="power" />
            <div>/</div>
            <Tile name="city" anyone />
          </div>
        </Production>
      </div>
      <div className="description middle text-center">{desc}</div>
    </div>
  )
});
