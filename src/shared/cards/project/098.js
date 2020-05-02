import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  MegaCredit,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your heat production 2 steps and increase your M€ production 3 steps.';

export default new Automated({
  number: 98,
  title: 'Tropical Resort',
  cost: 13,
  tags: ['building'],
  set: 'corporate',
  desc,
  flavor: 'Utilizing heat production to attract tourists',
  clientAction: () => {},
  serverAction: () => {},
  vp: 2,
  emoji: '🏖',
  layout: (
    <div className="flex gutter">
      <div className="col-3 text-center">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <Resource name="heat" />
            <Resource name="heat" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <MegaCredit value="3" />
            <Resource name="blank" />
          </div>
        </Production>
        <div className="description m-top">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">2</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
