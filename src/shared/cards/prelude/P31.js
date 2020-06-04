import React from 'react';
import Prelude from '../Prelude';
import {
  Production,
  Resource,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const desc =
  'Decrease your M€ production 1 step. Increase your plant production, energy production, and heat production 1 step each.';

export default new Prelude({
  number: 'P31',
  title: 'Society Support',
  tags: [],
  set: 'prelude',
  desc,
  flavor: 'Meeting the needs of society is good, because it’s your society',
  emoji: '🏘',
  serverAction: player => {
    player.production.megacredit--;
    player.production.plant++;
    player.production.power++;
    player.production.heat++;
  },
  layout: (
    <div className="flex gutter">
      <div className="col-2 middle text-center">
        <Production>
          <div className="flex">
            <MegaCredit value="-1" />
            <Resource name="plant" />
          </div>
          <div className="flex">
            <Resource name="power" />
            <Resource name="heat" />
          </div>
        </Production>
      </div>
      <div className="description col-3 middle">{desc}</div>
    </div>
  )
});
