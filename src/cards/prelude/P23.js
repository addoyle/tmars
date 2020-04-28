import React from 'react';
import Prelude from '../Prelude';
import {
  Production,
  Resource
} from '../../client/game/components/assets/Assets';

const desc =
  'Increase your steel production 1 step, and your heat production 2 steps. Gain 2 heat.';

export default new Prelude({
  number: 'P23',
  title: 'Mohole Excavation',
  tags: ['building'],
  set: 'prelude',
  desc,
  flavor: "Making use of all the minerals you're digging up",
  emoji: '🧱',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="steel" />
            <Resource name="heat" />
            <Resource name="heat" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle">
        <div className="resources">
          <Resource name="heat" />
          <Resource name="heat" />
        </div>
      </div>
      <div className="description col-2 middle">{desc}</div>
    </div>
  )
});
