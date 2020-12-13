import React from 'react';
import Automated from '../Automated';
import {
  Param,
  Tag,
  MegaCredit,
  Production
} from '../../../client/game/components/assets/Assets';

const desc =
  'Increase Venus 1 step. Increase your M€ production 1 step for each Venus tag you have, including this.';

export default new Automated({
  number: 250,
  title: 'Sulphur Exports',
  cost: 21,
  tags: ['venus', 'space'],
  set: 'venus',
  desc,
  flavor: 'We have too much of it anyway',
  action: () => {},
  emoji: '🍯',
  todo: true,
  layout: (
    <div className="flex">
      <div className="middle col-2">
        <div className="resources">
          <Param name="venus" />
        </div>
        <div className="flex">
          <Production>
            <div className="flex">
              <MegaCredit value="1" />
            </div>
          </Production>
          <div className="middle resources">
            /<Tag name="venus" />
          </div>
        </div>
      </div>
      <div className="col-3 description middle">{desc}</div>
    </div>
  )
});
