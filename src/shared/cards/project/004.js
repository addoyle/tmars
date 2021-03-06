import React from 'react';
import Automated from '../Automated';
import {
  Resource,
  MegaCredit,
  Production
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires 3 ocean tiles. Decrease your M€ production 1 step and any heat production 1 step. Increase your plant production 2 steps.';

export default new Automated({
  number: '004',
  title: 'Cloud Seeding',
  cost: 11,
  tags: [],
  restriction: {
    value: 3,
    tile: 'ocean'
  },
  desc,
  flavor: 'Lessens solar influx, but enhances plant growth',
  production: {
    anyone: {
      heat: -1
    },
    megacredit: -1,
    plant: 2
  },
  emoji: '⛅',
  layout: (
    <div className="flex gutter">
      <div className="col-2 middle">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <MegaCredit value="1" />
            <Resource name="heat" anyone />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="plant" />
            <Resource name="plant" />
          </div>
        </Production>
      </div>
      <div className="col-3 middle description">{desc}</div>
    </div>
  )
});
