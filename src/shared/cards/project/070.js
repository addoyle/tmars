import React from 'react';
import Active from '../Active';
import {
  MegaCredit,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const activeDesc = 'Effect: When you play a card, you pay 2€ less for it.';

export default new Active({
  number: '070',
  title: 'Earth Catapult',
  cost: 23,
  tags: ['earth'],
  set: 'corporate',
  activeDesc,
  flavor: 'When export from Earth becomes easier, everything gets cheaper',
  action: player => (player.rates.cost.all = (player.rates.cost.all || 0) - 2),
  vp: 2,
  emoji: '🌎',
  activeLayout: (
    <div>
      <div className="resources text-center">
        :<MegaCredit value="-2" />
      </div>
      <div className="description text-center">{activeDesc}</div>
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
