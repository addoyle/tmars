import React from 'react';
import Prelude from '../Prelude';
import {
  MegaCredit,
  Production
} from '../../client/game/components/assets/Assets';

const desc = 'Increase your M€ production 6 steps. Remove 6 M€.';

export default new Prelude({
  number: 'P06',
  title: 'Business Empire',
  tags: ['earth'],
  set: 'prelude',
  desc,
  flavor: 'Numerous assets on Earth that support your Mars efforts',
  emoji: '💼',
  layout: (
    <div className="flex gutter">
      <div className="col-1 text-center middle">
        <Production>
          <div className="flex">
            <MegaCredit value="6" />
          </div>
        </Production>
      </div>
      <div className="col-1 text-center middle">
        <div className="resources">
          <MegaCredit value="-6" />
        </div>
      </div>
      <div className="description col-6 middle">{desc}</div>
    </div>
  )
});
