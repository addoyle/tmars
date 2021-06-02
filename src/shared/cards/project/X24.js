import React from 'react';
import Automated from '../Automated';
import { Resource } from '../../../client/game/components/assets/Assets';

const desc = 'Requires 3 power tags. Raise your TR 4 steps.';

export default new Automated({
  number: 'X24',
  title: 'Magnetic Shield',
  cost: 24,
  tags: ['space'],
  set: 'promo',
  restriction: {
    value: 3,
    tag: 'power'
  },
  desc,
  flavor:
    'Generating a magnetic field at the L1 Lagrange point will deflect solar radiation from Mars',
  tr: 4,
  emoji: '🧲',
  layout: (
    <div className="flex m-top m-bottom">
      <div className="col-1 middle text-center">
        <div className="resources">
          <span>4</span>
          <Resource name="tr" />
        </div>
      </div>
      <div className="col-2 middle description">{desc}</div>
    </div>
  )
});
