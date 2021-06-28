import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc = 'You start with 10 titanium and 23 M€.';
const effectDesc = 'Effect: Your titanium resources are each worth 1 M€ extra.';

export default new Corporation({
  number: 'CORP07',
  title: 'PhoboLog',
  titleClass: 'phobolog',
  resources: {
    megacredit: 30,
    titanium: 10
  },
  action: player => (player.rates.titanium = 1),
  tags: ['space'],
  desc,
  effectDesc,
  flavor:
    'Aiming to be the leader in space solutions for the Mars era, PhoboLog acquired several national space programs. This allowed them access to much existing infrastructure and technology, and they are not going to let that advantage be wasted.',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="flex">
          <div className="resources middle center">
            <span>10</span>
            <Resource name="titanium" />
          </div>
          <div className="resources middle center">
            <MegaCredit value="23" />
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 middle">
        <div className="effect">
          <div className="effect-title">Effect</div>
          <div className="flex center">
            <div className="resources">
              <Resource name="titanium" /> : +<MegaCredit value="1" />
            </div>
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
