import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  Param,
  Production
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase your energy production 1 step. Increase temperature 1 step.';

export default new Automated({
  number: '003',
  title: 'Deep Well Heating',
  cost: 13,
  tags: ['power', 'building'],
  desc,
  flavor: 'Digging deep to find heat from the core',
  param: ['temperature'],
  production: {
    power: 1
  },
  emoji: '☕',
  layout: (
    <div className="flex gutter m-top m-bottom">
      <div className="col-1 middle">
        <Production>
          <Resource name="power" />
        </Production>
      </div>
      <div className="col-1 middle text-center resources">
        <Param name="temperature" />
      </div>
      <div className="col-4 description middle">{desc}</div>
    </div>
  )
});
