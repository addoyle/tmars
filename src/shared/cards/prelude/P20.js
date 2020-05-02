import React from 'react';
import Prelude from '../Prelude';
import {
  MegaCredit,
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase your M€ production, steel production, and titanium production 1 step each.';

export default new Prelude({
  number: 'P20',
  title: 'Metals Company',
  tags: [],
  set: 'prelude',
  desc,
  flavor:
    'Your acquisition of this company connects you to the whole metal market',
  emoji: '⚙',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <MegaCredit value="1" />
            <Resource name="steel" />
            <Resource name="titanium" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle description">{desc}</div>
    </div>
  )
});
