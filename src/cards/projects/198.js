import React from 'react';
import Automated from '../../client/components/Automated';
import { Production, MegaCredit, Tile, VictoryPoint } from '../../client/components/assets/Assets';

const desc = 'Increase your M€ production 5 steps. 1 VP for every 3rd city in play.';

export default new Automated({
  number: 198,
  title: 'Immigration Shuttles',
  cost: 31,
  tags: ['earth', 'space'],
  desc,
  flavor: 'The new world attracts ever more immigrants from the old',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🛬',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <MegaCredit value="5" />
          </div>
        </Production>
      </div>
      <div className="col-2 middle text-center description">{desc}</div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/3<Tile name="city" anyone />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
