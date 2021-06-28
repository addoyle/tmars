import React from 'react';
import Prelude from '../Prelude';
import {
  Resource,
  Production,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase your energy production and steel production 1 step each. Gain 6 M€.';

export default new Prelude({
  number: 'P18',
  title: 'Martian Industries',
  tags: ['building'],
  set: 'prelude',
  desc,
  flavor: 'Allowing a steady growth of the Martian society',
  emoji: '🏭',
  resources: {
    megacredit: 6
  },
  production: {
    power: 1,
    steel: 1
  },
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="power" />
            <Resource name="steel" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle">
        <div className="resources">
          <MegaCredit value="6" />
        </div>
      </div>
      <div className="description col-3 middle">{desc}</div>
    </div>
  )
});
