import React from 'react';
import Prelude from '../Prelude';
import { Resource, Production } from '../../client/components/assets/Assets';

const desc = 'Increase your heat production 3 steps. Gain 3 heat.';

export default new Prelude({
  number: 'P22',
  title: 'Mohole',
  tags: ['building'],
  set: 'prelude',
  desc,
  flavor: 'Getting down to the heat of the mantle',
  emoji: '♨',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <div className="col-1"><span>3</span></div>
            <Resource name="heat" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle">
        <div className="resources">
          <span>3</span><Resource name="heat" />
        </div>
      </div>
      <div className="description col-3 middle">{desc}</div>
    </div>
  )
});
