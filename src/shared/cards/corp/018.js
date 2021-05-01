import React from 'react';
import Corporation from '../Corporation';
import { MegaCredit } from '../../../client/game/components/assets/Assets';

const desc = 'You start with 48 M€.';
const effectDesc =
  'Action: Use a blue card action that has already been used this generation.';

export default new Corporation({
  number: '018',
  title: 'Viron',
  titleClass: 'viron',
  resources: { megacredit: 48 },
  tags: ['microbe'],
  set: 'venus',
  desc,
  effectDesc,
  todo: true,
  flavor:
    'Founded by three Nobel Prize winners, Viron developed viral enhancers, able to modify diverse organisms and make them more efficient. These organisms are then put to use in various processes.',
  layout: (
    <div className="flex gutter">
      <div className="col-3 bottom">
        <div className="resources text-center">
          <MegaCredit value="48" />
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-4 middle">
        <div className="effect">
          <div className="effect-title">Action</div>
          <div className="center flex">
            <div className="col-1 resources middle">
              <span className="arrow" />
            </div>
            <div className="col-1 middle">
              <div className="effect-title" style={{ fontSize: '.5em' }}>
                Action
              </div>
              <div className="resources text-center">
                <span className="arrow" />
              </div>
            </div>
          </div>
          <div className="description">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
