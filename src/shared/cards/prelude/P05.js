import React from 'react';
import Prelude from '../Prelude';
import {
  MegaCredit,
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your M€ production 1 step. Increase your plant production 2 steps.';

export default new Prelude({
  number: 'P05',
  title: 'Biosphere Support',
  tags: ['plant'],
  set: 'prelude',
  desc,
  flavor: 'The greening of the red planet has begun',
  emoji: '🏡',
  serverAction: player => {
    player.production.megacredit--;
    player.production.plant += 2;
  },
  layout: (
    <div className="flex gutter">
      <div className="col-2 text-center middle">
        <Production>
          <div className="flex">
            <MegaCredit value="-1" />
            <Resource name="plant" />
            <Resource name="plant" />
          </div>
        </Production>
      </div>
      <div className="description col-3 middle">{desc}</div>
    </div>
  )
});
