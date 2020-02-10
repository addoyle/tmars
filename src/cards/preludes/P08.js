import React from 'react';
import Prelude from '../Prelude';
import { MegaCredit } from '../../client/components/assets/Assets';

const desc = 'Gain 21 M€.';

export default new Prelude({
  number: 'P08',
  title: 'Donation',
  tags: [],
  set: 'prelude',
  desc,
  flavor: 'From a rich benefactor with absolutely no hidden agenda',
  emoji: '💶',
  layout: (
    <div className="text-center">
      <div className="resources">
        <MegaCredit value="21" />
      </div>
      <div className="description">{desc}</div>
    </div>
  )
});
