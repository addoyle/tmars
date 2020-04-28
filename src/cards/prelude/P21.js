import React from 'react';
import Prelude from '../Prelude';
import {
  Resource,
  Production
} from '../../client/game/components/assets/Assets';

const desc = 'Increase your steel production 2 steps. Gain 4 steel.';

export default new Prelude({
  number: 'P21',
  title: 'Mining Operations',
  tags: ['building'],
  set: 'prelude',
  desc,
  flavor: 'Your mettle is in your metal',
  emoji: '🏗️',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="steel" />
            <Resource name="steel" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle">
        <div className="resources">
          <span>4</span>
          <Resource name="steel" />
        </div>
      </div>
      <div className="description col-2 middle">{desc}</div>
    </div>
  )
});
