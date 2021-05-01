import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your energy production 1 step. Raise your terraform rating 2 steps.';

export default new Automated({
  number: '205',
  title: 'Rad-Chem Factory',
  cost: 8,
  tags: ['building'],
  desc,
  flavor:
    'Certain aromatic compounds can absorb dangerous radiation without breaking',
  action: (player, game) => game.tr(player, 2),
  production: {
    power: -1
  },
  emoji: '🧬',
  layout: (
    <div className="text-center">
      <div className="flex gutter center">
        <div>
          <Production>
            <div className="flex">
              <div className="col-1">&ndash;</div>
              <Resource name="power" />
            </div>
          </Production>
        </div>
        <div className="resources">
          <Resource name="tr" />
          <Resource name="tr" />
        </div>
      </div>
      <div className="description m-bottom">{desc}</div>
    </div>
  )
});
