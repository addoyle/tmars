import React from 'react';
import Prelude from '../Prelude';
import {
  MegaCredit,
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'Raise your terraform rating 1 step. Increase your plant production 1 step. Gain 5 M€.';

export default new Prelude({
  number: 'P24',
  title: 'Nitrogen Shipment',
  tags: [],
  set: 'prelude',
  desc,
  flavor: 'Mars needs it to get the air pressure up',
  emoji: '💨',
  serverAction: player => {
    player.tr++;
    player.production.plant++;
    player.resources.megacredit += 5;
  },
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="resources">
          <Resource name="tr" />
        </div>
      </div>
      <div className="col-1 middle text-center">
        <Production>
          <div className="flex">
            <Resource name="plant" />
          </div>
        </Production>
      </div>
      <div className="col-1 middle">
        <div className="resources">
          <MegaCredit value="5" />
        </div>
      </div>
      <div className="description col-4 middle">{desc}</div>
    </div>
  )
});
