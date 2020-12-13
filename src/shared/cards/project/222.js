import React from 'react';
import Active from '../Active';
import {
  Resource,
  Tag,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Add 1 floater to ANY card. Effect: When playing a Venus tag, floaters here may be used as payment, and are worth 3 M€ each.';

export default new Active({
  number: 222,
  title: 'Dirigibles',
  cost: 11,
  tags: ['venus'],
  set: 'venus',
  activeDesc,
  flavor: 'The Venus way to travel',
  action: () => {},
  emoji: '🎈',
  todo: true,
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell middle resources text-center">
            <span className="arrow" />
          </div>
          <div className="cell middle resources">
            <Resource name="floater" />*
          </div>
        </div>
        <div className="row">
          <div className="cell middle resources text-center">
            <Tag name="venus" />
            <span>:</span>
          </div>
          <div className="cell middle resources">
            <Resource name="floater" />
            <span>=</span>
            <MegaCredit value="3" />
          </div>
        </div>
      </div>
      <div className="description text-center" style={{ padding: '0 1em' }}>
        {activeDesc}
      </div>
    </div>
  ),
  layout: <div />
});
