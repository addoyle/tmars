import React from 'react';
import Automated from '../Automated';
import {
  Production,
  Resource
} from '../../../client/game/components/assets/Assets';

const desc = 'Increase your energy production 3 steps.';

export default new Automated({
  number: 83,
  title: 'Giant Space Mirror',
  cost: 17,
  tags: ['power', 'space'],
  desc,
  flavor:
    'Square kilometers of extra sunlight reflected down to a receiving power plant',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🪞',
  layout: (
    <div className="text-center">
      <Production>
        <div className="flex">
          <Resource name="power" />
          <Resource name="power" />
          <Resource name="power" />
        </div>
      </Production>
      <div className="description m-top m-bottom">{desc}</div>
    </div>
  )
});
