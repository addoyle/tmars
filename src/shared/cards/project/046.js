import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  Production,
  MegaCredit,
  VictoryPoint
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your M€ production 2 steps and increase your energy production 3 steps.';

export default new Automated({
  number: '046',
  title: 'Lightning Harvest',
  cost: 10,
  tags: ['power'],
  restriction: {
    value: 3,
    tag: 'science'
  },
  set: 'corporate',
  desc,
  flavor:
    'Floating supercapacitors connecting clouds with a superconducting wire. The triggered and collected discharges are beamed down to a receptor',
  production: {
    megacredit: -2,
    power: 3
  },
  vp: 1,
  emoji: '🔋',
  layout: (
    <div className="flex gutter">
      <div className="col-4 middle">
        <div className="center flex m-bottom">
          <Production>
            <div className="flex">
              <Resource name="power" />
              <MegaCredit value="1" />
            </div>
          </Production>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
