import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../client/game/components/assets/Assets';

const desc = 'Increase your titanium production 1 step.';

export default new Automated({
  number: 144,
  title: 'Titanium Mine',
  cost: 7,
  tags: ['building'],
  set: 'corporate',
  desc,
  flavor:
    'Titanium is useful to the space industry because of its great strength',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🏗️',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="titanium" />
          </div>
        </Production>
      </div>
      <div className="col-3 description text-center middle">{desc}</div>
    </div>
  )
});
