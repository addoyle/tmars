import React from 'react';
import Event from '../Event';
import {
  MegaCredit,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc = 'Steel up to 2 steel, or 3 M€ from any other player.';

export default new Event({
  number: 124,
  title: 'Hired Raiders',
  cost: 1,
  tags: ['event'],
  set: 'corporate',
  desc,
  flavor: 'We have a better use for those resources',
  action: () => {},
  emoji: '🏴‍☠️',
  layout: (
    <div className="text-center">
      <div className="flex gutter">
        <div className="col-2 text-right">
          <div className="resources">
            <span>STEAL 2</span>
          </div>
        </div>
        <div className="col-1 text-left">
          <div className="resources">
            <Resource name="titanium" anyone />
          </div>
        </div>
      </div>
      <div className="flex gutter">
        <div className="col-2 text-right">
          <div className="resources">
            <span>OR STEAL</span>
          </div>
        </div>
        <div className="col-1 text-left">
          <div className="resources">
            <MegaCredit value="3" anyone />
          </div>
        </div>
      </div>
      <div className="description text-center m-top">{desc}</div>
    </div>
  )
});
