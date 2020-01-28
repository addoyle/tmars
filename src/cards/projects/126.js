import React from 'react';
import Automated from '../../client/components/cards/Automated';
import { Production, Resource } from '../../client/components/assets/Assets';

const desc = 'Decrease your energy production 1 step and increase your heat production 4 steps.';

export default new Automated({
  number: 126,
  title: 'GHG Factories',
  cost: 11,
  tags: ['building'],
  desc,
  flavor: 'Synthesizing powerful greenhouse gases (GHGs), releasing them into the atmosphere',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🏭',
  layout: (
    <div className="flex gutter">
      <div className="col-1">
        <Production>
          <div className="flex">
            <div className="col-1">&ndash;&nbsp;</div>
            <Resource name="power" />
          </div>
          <div className="flex">
            <div className="col-1">+4</div>
            <Resource name="heat" />
          </div>
        </Production>
      </div>
      <div className="description text-center middle col-2">{desc}</div>
    </div>
  )
});
