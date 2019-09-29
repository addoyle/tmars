import React from 'react';
import Automated from '../../client/components/Automated';
import { Production, Resource } from '../../client/components/assets/Assets';

const desc = 'Increase your energy production 2 steps.';

export default new Automated({
  number: 117,
  title: 'Geothermal Power',
  cost: 11,
  tags: ['power', 'building'],
  desc,
  flavor: 'Utilizing heat from the core through the cracks in the crust',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '♨',
  layout: (
    <div className="text-center">
      <Production>
        <div className="flex">
          <div>
            <Resource name="power" />
            <Resource name="power" />
          </div>
        </div>
      </Production>
      <div className="description m-top m-bottom">{desc}</div>
    </div>
  )
});
