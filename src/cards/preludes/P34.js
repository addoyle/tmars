import React from 'react';
import Prelude from '../Prelude';
import { Param, Resource } from '../../client/components/assets/Assets';

const desc = 'Raise your terraform rating 3 steps. Draw 1 card.';

export default new Prelude({
  number: 'P34',
  title: 'UNMI Contractor',
  tags: ['earth'],
  set: 'prelude',
  desc,
  flavor: 'Your early terraforming work for UNMI is taken into account by the Terraforming Committee',
  emoji: '🤝',
  layout: (
    <div className="flex gutter">
      <div className="col-2 middle text-center">
        <div className="resources">
          <span>3</span><Resource name="tr" />
          <Param name="card back" />
        </div>
      </div>
      <div className="description col-3 middle">{desc}</div>
    </div>
  )
});
