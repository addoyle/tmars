import React from 'react';
import Automated from '../Automated';
import {
  MegaCredit,
  Production,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your M€ production 3 steps.';

export default new Automated({
  number: 82,
  title: 'Callisto Penal Mines',
  cost: 24,
  tags: ['jovian', 'space'],
  set: 'corporate',
  desc,
  flavor: 'You always wanted to be a warden, didn’t you?',
  clientAction: () => {},
  serverAction: () => {},
  vp: 2,
  emoji: '👮',
  layout: (
    <div className="flex gutter">
      <div className="col-3 text-center">
        <Production>
          <div className="flex">
            <MegaCredit value="3" />
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
