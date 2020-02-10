import React from 'react';
import Prelude from '../Prelude';
import { Production, Resource } from '../../client/components/assets/Assets';

const desc = 'Increase your energy production 2 steps. Gain 4 steel.';

export default new Prelude({
  number: 'P32',
  title: 'Supplier',
  tags: ['power'],
  set: 'prelude',
  desc,
  flavor: 'A subcontractor providing energy and material for your projects',
  emoji: '🚚',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="power" />
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle">
        <div className="resources">
          <span>4</span><Resource name="steel" />
        </div>
      </div>
      <div className="description col-2 middle">{desc}</div>
    </div>
  )
});
