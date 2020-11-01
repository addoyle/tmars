import React from 'react';
import Automated from '../Automated';
import { Production, Tag } from '../../../client/game/components/assets/Assets';

const desc = 'Duplicate only the production box of one of your building cards.';

export default new Automated({
  number: 86,
  title: 'Robotic Workforce',
  cost: 9,
  tags: ['science'],
  set: 'corporate',
  desc,
  flavor: 'Enhancing your production capacity',
  action: () => {},
  emoji: '🤖',
  layout: (
    <div className="m-bottom">
      <div className="flex center">
        <div className="resources middle">COPY A&nbsp;</div>
        <Production>
          <div className="flex">
            <Tag name="building" />
          </div>
        </Production>
      </div>
      <div className="description text-center m-top">{desc}</div>
    </div>
  )
});
