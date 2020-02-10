import React from 'react';
import Prelude from '../Prelude';
import { Param, Resource } from '../../client/components/assets/Assets';

const desc = 'Gain 6 titanium. Reveal cards from the deck until you have revealed 2 space cards. Take those into hand, and discard the rest.';

export default new Prelude({
  number: 'P35',
  title: 'Acquired Space Agency',
  tags: [],
  set: 'prelude',
  desc,
  flavor: 'The Western Alliance Space Agency has a lot of leverage, now at your disposal',
  emoji: '🛰️',
  layout: (
    <div className="flex gutter">
      <div className="col-2 middle text-center">
        <div className="resources">
          <span>6</span><Resource name="titanium" />
          <Param name="card back" tag="space" />
          <Param name="card back" tag="space" />
        </div>
      </div>
      <div className="description col-3 middle">{desc}</div>
    </div>
  )
});
