import React from 'react';
import Automated from '../Automated';
import {
  VictoryPoint,
  Resource,
  Production,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires Venus 10%. Add 2 microbes or 2 animals TO ANOTHER VENUS CARD. Decrease your energy production 1 step, and increase your M€ production 2 steps.';

export default new Automated({
  number: 227,
  title: 'Freyja Biodomes',
  cost: 14,
  tags: ['venus', 'plant'],
  set: 'venus',
  restriction: {
    value: 10,
    param: 'venus'
  },
  desc,
  flavor:
    'A safe place to get the ecosystem started, in the northern mountains, where conditions are only mildly hellish',
  clientAction: () => {},
  serverAction: () => {},
  vp: 2,
  emoji: '⛰',
  layout: (
    <div>
      <div className="flex">
        <div className="middle text-center">
          <Production>
            <div className="flex">
              <div className="col-1">&ndash;</div>
              <Resource name="power" />
            </div>
            <div className="flex">
              <div className="col-1">+</div>
              <MegaCredit value="2" />
            </div>
          </Production>
        </div>
        <div className="resources middle text-center">
          <Resource name="microbe" tag="venus" />
          &nbsp;
          <Resource name="microbe" tag="venus" />
          &nbsp;
          <span>OR</span>
          <Resource name="animal" tag="venus" />
          &nbsp;
          <Resource name="animal" tag="venus" />
        </div>
      </div>
      <div className="flex gutter">
        <div className="description middle text-center">{desc}</div>
        <div className="text-right bottom">
          <VictoryPoint>
            <span className="big point">2</span>
          </VictoryPoint>
        </div>
      </div>
    </div>
  )
});
