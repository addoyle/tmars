import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc =
  'Requires that you have steel production. Decrease any steel production 1 step and increase your own 1 step.';

export default new Automated({
  number: 61,
  title: 'Great Escarpment Consortium',
  cost: 6,
  tags: [],
  set: 'corporate',
  restriction: {
    value: 1,
    production: 'steel'
  },
  desc,
  flavor:
    'The border between the northern plains and the southern highlands is rich in minerals. Control it, and you will control the global mining business',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '⛰',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <div className="flex gutter">
          <Production>
            <div className="flex">
              <div>&ndash;</div>
              <Resource name="steel" anyone />
            </div>
            <div className="flex">
              <div>+</div>
              <Resource name="steel" />
            </div>
          </Production>
        </div>
      </div>
      <div className="col-2">
        <div className="description m-top">{desc}</div>
      </div>
    </div>
  )
});
