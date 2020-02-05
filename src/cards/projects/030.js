import React from 'react';
import Automated from '../Automated';
import { Resource, Production, MegaCredit } from '../../client/components/assets/Assets';

const desc = 'Decrease your M€ production 2 steps and increase your heat production and energy production 2 steps each.';

export default new Automated({
  number: 30,
  title: 'Lunar Beam',
  cost: 13,
  tags: ['earth', 'power'],
  desc,
  flavor: 'A huge energy beam. Difficult to collect, but who cares?',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🌠',
  layout: (
    <div className="flex">
      <div className="col-2">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;</div>
            <MegaCredit value="2" />
            <Resource name="blank" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="heat" />
            <Resource name="heat" />
          </div>
          <div className="flex">
            <div className="col-1">+</div>
            <Resource name="power" />
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-3">
        <div className="description">{desc}</div>
      </div>
    </div>
  )
});
