import React from 'react';
import Active from '../../client/components/cards/Active';
import { MegaCredit, VictoryPoint } from '../../client/components/assets/Assets';

const top_desc = 'Effect: When you play a card, you pay 2€ less for it.';

export default new Active({
  number: 70,
  title: 'Earth Catapult',
  cost: 23,
  tags: ['earth'],
  set: 'corporate',
  top_desc,
  flavor: 'When export from Earth becomes easier, everything gets cheaper',
  clientAction: game => {},
  serverAction: game => {},
  vp: 2,
  emoji: '🌎',
  activeLayout: (
    <div>
      <div className="resources text-center">
        :<MegaCredit value="-2" />
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="flex gutter">
      <div className="col-3"></div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
