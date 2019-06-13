import React from 'react';
import Active from '../../client/components/Active';
import { VictoryPoint, Tag, MegaCredit } from '../../client/components/assets/Assets';

const top_desc = 'Effect: When you play a space card, you pay 2 M€ less for it.';

export default new Active({
  number: 25,
  title: 'Space Station',
  cost: 10,
  tags: ['space'],
  set: 'corporate',
  top_desc,
  flavor: 'Buy it today at www.fryxgames.se',
  clientAction: game => {},
  serverAction: game => {},
  vp: 1,
  emoji: '🛰',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Tag name="space" />:
        <MegaCredit value="-2" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="flex">
      <div className="col-4"></div>
      <div className="col-1">
        <VictoryPoint>
            <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
