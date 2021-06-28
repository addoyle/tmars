import React from 'react';
import Prelude from '../Prelude';
import { Resource } from '../../../client/game/components/assets/Assets';

const desc = 'Gain 3 titanium, 8 steel, and 3 plants.';

export default new Prelude({
  number: 'P33',
  title: 'Supply Drop',
  tags: [],
  set: 'prelude',
  desc,
  flavor: 'Allowing you to speed up your colonization',
  emoji: '🪂',
  resources: {
    titanium: 3,
    steel: 8,
    plant: 3
  },
  layout: (
    <div className="flex gutter m-bottom">
      <div className="col-1 middle text-center">
        <div className="resources">
          <span>3</span>
          <Resource name="titanium" />
          <span>8</span>
          <Resource name="steel" />
          <span>3</span>
          <Resource name="plant" />
        </div>
      </div>
      <div className="description col-1 middle">{desc}</div>
    </div>
  )
});
