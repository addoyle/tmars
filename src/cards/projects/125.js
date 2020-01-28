import React from 'react';
import Automated from '../../client/components/cards/Automated';
import { Production, MegaCredit, Resource, VictoryPoint } from '../../client/components/assets/Assets';

const desc = 'Decrease your enery production 1 step and any M€ production 2 steps. Increase your M€ production 2 steps.';

export default new Automated({
  number: 125,
  title: 'Hackers',
  cost: 3,
  tags: [],
  set: 'corporate',
  desc,
  flavor: 'Very unethical, very illegal, very lucrative',
  clientAction: game => {},
  serverAction: game => {},
  vp: -1,
  emoji: '💻',
  layout: (
    <div className="flex gutter center">
      <div className="col-3 text-center">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="power" />
            <MegaCredit value="2" anyone />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <MegaCredit value="2" />
            <Resource name="blank" />
          </div>
        </Production>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">-1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
