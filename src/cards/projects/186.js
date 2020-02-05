import React from 'react';
import Automated from '../Automated';
import { Production, MegaCredit, VictoryPoint } from '../../client/components/assets/Assets';

const desc = 'Requires 2 cities in play. Increase your M€ production 1 step.';

export default new Automated({
  number: 186,
  title: 'Rad-Suits',
  cost: 6,
  tags: [],
  set: 'corporate',
  restriction: {
    value: 2,
    tile: 'city',
    anyone: true
  },
  desc,
  flavor: 'New synthetic fabrics, able to protect from cosmic radiation, are becoming high fashion',
  clientAction: game => {},
  serverAction: game => {},
  vp: 1,
  emoji: '👨‍🚀',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <MegaCredit value="1" />
          </div>
        </Production>
      </div>
      <div className="col-2 middle text-center">
        <div className="description">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
