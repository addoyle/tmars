import React from 'react';
import Active from '../../client/components/Active';
import { Resource, MegaCredit, VictoryPoint } from '../../client/components/assets/Assets';

const top_desc = 'Effect: Your steel resources are worth 1 M€ extra.';

export default new Active({
  number: 'X10',
  title: 'Rego Plastics',
  cost: 10,
  tags: ['building'],
  set: 'promo',
  top_desc,
  flavor: 'Silicon-based plastics for everyday use. Made from Martian regolith',
  clientAction: game => {},
  serverAction: game => {},
  vp: 1,
  emoji: '♻',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Resource name="steel" />: <span>+</span><MegaCredit value="1" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-1" />
      <div className="bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
