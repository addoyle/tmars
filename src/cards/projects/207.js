import React from 'react';
import Automated from '../../client/components/Automated';
import { Production, MegaCredit, Tag, VictoryPoint } from '../../client/components/assets/Assets';

const desc = 'Increase your M€ production 1 step for every 2 building tags you have, including this.';

export default new Automated({
  number: 207,
  title: 'Medical Lab',
  cost: 13,
  tags: ['science', 'building'],
  set: 'corporate',
  desc,
  flavor: 'Providing health care for the public can be lucrative, as well as noble',
  clientAction: game => {},
  serverAction: game => {},
  vp: 1,
  emoji: '🔬',
  layout: (
    <div className="flex gutter">
      <div className="col-3 middle text-center">
        <Production>
          <div className="flex">
            <MegaCredit value="1" />
            <span className="middle">/2</span>
            <Tag name="building" />
          </div>
        </Production>
        <div className="description m-bottom">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
