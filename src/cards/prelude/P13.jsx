import React from 'react';
import Prelude from '../Prelude';
import {
  MegaCredit,
  Resource,
  Production
} from '../../client/game/components/assets/Assets';

const desc = 'Increase your titanium production 2 steps. Remove 5 M€.';

export default new Prelude({
  number: 'P13',
  title: 'Galilean Mining',
  tags: ['jovian'],
  set: 'prelude',
  desc,
  flavor: 'The big moons of Jupiter are great for mining',
  emoji: '🌖',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="titanium" />
            <Resource name="titanium" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle">
        <div className="resources">
          <MegaCredit value="-5" />
        </div>
      </div>
      <div className="description col-3 middle">{desc}</div>
    </div>
  )
});
