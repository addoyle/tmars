import React from 'react';
import Corporation from '../Corporation';
import {
  MegaCredit,
  Resource,
  Production
} from '../../../client/game/components/assets/Assets';

const desc = 'You start with 3 heat production and 42 M€.';
const effectDesc =
  'Effect: You may use heat as M€. You may not use M€ as heat.';

export default new Corporation({
  number: '003',
  title: 'Helion',
  titleClass: 'helion',
  starting: {
    resources: {
      megacredit: 42
    },
    production: {
      heat: 3
    }
  },
  tags: ['space'],
  desc,
  effectDesc,
  todo: true,
  flavor:
    'Developers of ultra-light solar sails, Helion now turns to the terraforming of Mars and other worlds. It promises to be a rewarding business, as Helion has already made a working model of a soletta, focusing sunlight down to the frozen planet.',
  layout: (
    <div className="flex gutter">
      <div className="col-1 bottom">
        <div className="flex">
          <Production>
            <div className="flex">
              <Resource name="heat" />
              <Resource name="heat" />
              <Resource name="heat" />
            </div>
          </Production>
          <div className="resources middle center">
            <MegaCredit value="42" />
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-1 middle">
        <div className="effect">
          <div className="effect-title">Effect</div>
          <div className="resources">
            <span>X</span>
            <Resource name="heat" />
            <span>=</span>
            <MegaCredit value="X" />
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
