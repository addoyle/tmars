import React from 'react';
import Automated from '../Automated';
import { Production, Resource } from '../../client/components/assets/Assets';

const desc = 'Increase your plant production 1 step or your energy production 2 steps.';

export default new Automated({
  number: 115,
  title: 'Artificial Photosynthesis',
  cost: 12,
  tags: ['science'],
  desc,
  flavor: 'Artificial photosynthesis was achieved chemically by prof Akermark et. al. in 2021. Its application to terraforming remains to be seen',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🍃',
  layout: (
    <div className="text-center">
      <Production>
        <div className="flex">
          <div>
            <Resource name="plant" />
            <span>&nbsp;OR&nbsp;</span>
            <Resource name="power" />
            <Resource name="power" />
          </div>
        </div>
      </Production>
      <div className="description m-top m-bottom">{desc}</div>
    </div>
  )
});
