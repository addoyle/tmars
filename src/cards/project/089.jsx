import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  MegaCredit
} from '../../client/game/components/assets/Assets';

const desc =
  'Decrease your M€ production 1 step and increase your energy production 2 steps.';

export default new Automated({
  number: 89,
  title: 'Peroxide Power',
  cost: 7,
  tags: ['power', 'building'],
  desc,
  flavor: 'The Martian ground is full of oxidizing agents',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🏭',
  layout: (
    <div className="flex gutter">
      <div className="col-2 middle">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <MegaCredit value="1" />
            <Resource name="blank" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="power" />
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-3">
        <div className="description m-top">{desc}</div>
      </div>
    </div>
  )
});
