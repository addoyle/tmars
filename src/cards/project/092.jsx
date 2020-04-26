import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource,
  MegaCredit,
  VictoryPoint,
  Tag
} from '../../client/game/components/assets/Assets';

const desc =
  'Increase your titanium production 2 steps and your M€ production 2 steps. 1 VP per Jovian tag you have.';

export default new Automated({
  number: 92,
  title: 'Io Mining Industries',
  cost: 11,
  tags: ['science', 'space', 'power'],
  set: 'corporate',
  desc,
  flavor: 'Supplying fuel and valuable minerals',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '⛏',
  layout: (
    <div className="flex gutter">
      <div className="col-3">
        <Production>
          <div className="flex">
            <Resource name="titanium" />
            <Resource name="titanium" />
            <MegaCredit value="2" />
          </div>
        </Production>
        <div className="description m-top">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span>
            <span className="point">1</span>/<Tag name="jovian" />
          </span>
        </VictoryPoint>
      </div>
    </div>
  )
});
