import React from 'react';
import Automated from '../../client/components/Automated';
import { Production, Resource } from '../../client/components/assets/Assets';

const desc = 'Increase your energy production 1 step and gain 2 titanium.';

export default new Automated({
  number: 77,
  title: 'Solar Wind Power',
  cost: 11,
  tags: ['science', 'space', 'power'],
  desc,
  flavor: 'Working those solar storms to your advantage',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '💨',
  layout: (
    <div className="flex gutter">
      <div className="col-1 middle">
        <Production>
          <div className="flex">
            <Resource name="power" />
          </div>
        </Production>
      </div>
      <div className="col-1 text-center">
        <div className="resources"><Resource name="titanium" /></div>
        <div className="resources"><Resource name="titanium" /></div>
      </div>
      <div className="col-3">
        <div className="description m-top">{desc}</div>
      </div>
    </div>
  )
});