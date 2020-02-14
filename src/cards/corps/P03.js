import React from 'react';
import Corporation from '../Corporation';
import { MegaCredit, Resource, Production } from '../../client/components/assets/Assets';

const desc = 'You start with 47 M€.';
const effectDesc = 'Action: Spend 4 M€ to increase (one of) your LOWEST PRODUCTION 1 step.';

export default new Corporation({
  number: 'P03',
  title: 'Robinson Industries',
  titleClass: 'robinson-industries',
  starting: {
    resources: {
      mc: 47
    }
  },
  tags: [],
  set: 'prelude',
  desc,
  effectDesc,
  flavor: 'Buying into diverse businesses, Robinson Industries is soon expected to influence all aspects of Martian life',
  layout: (
    <div className="flex gutter">
      <div className="col-2 middle">
        <div className="flex gutter">
          <div className="col-1 resources text-center middle">
            <MegaCredit value="47" />
          </div>
        </div>
        <div className="description text-center">{desc}</div>
      </div>
      <div className="col-3 middle">
        <div className="effect">
          <div className="effect-title">Action</div>
          <div className="resources">
            <MegaCredit value="4" /><span className="arrow" /><Production>
              <div className="flex">
                <Resource name="any" />
              </div>
            </Production>*
          </div>
          <div className="description m-top m-bottom">{effectDesc}</div>
        </div>
      </div>
    </div>
  )
});
