import React from 'react';
import Prelude from '../Prelude';
import { Param, Resource } from '../../../client/game/components/assets/Assets';

const desc = 'Raise temperature 1 step. Gain 4 titanium, and 4 steel.';

export default new Prelude({
  number: 'P19',
  title: 'Metal-Rich Asteroid',
  tags: [],
  set: 'prelude',
  desc,
  flavor: 'Metal delivery. Without brakes',
  emoji: '☄',
  param: 'temperature',
  resources: {
    titanium: 4,
    steel: 4
  },
  layout: (
    <div className="flex m-top m-bottom">
      <div className="col-1 middle text-center">
        <div className="resources">
          <Param name="temperature" />
          <span>4</span>
          <Resource name="titanium" />
          <span>4</span>
          <Resource name="steel" />
        </div>
      </div>
      <div className="col-1 middle description">{desc}</div>
    </div>
  )
});
