import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../client/game/components/assets/Assets';

const desc = 'Increase your energy production 2 steps.';

export default new Automated({
  number: 117,
  title: 'Geothermal Power',
  cost: 11,
  tags: ['power', 'building'],
  desc,
  flavor: 'Utilizing heat from the core through the cracks in the crust',
  clientAction: () => {},
  serverAction: () => {},
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
