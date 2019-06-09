import React from 'react';
import Automated from '../../components/Automated';
import Resource from '../../components/assets/Resource';
import Production from '../../components/assets/Production';

const desc = 'It must be -18°C or colder. Increase your plant production 1 step.';

export default new Automated({
  number: 42,
  title: 'Archaebacteria',
  cost: 6,
  tags: ['microbe'],
  restriction: {
    max: true,
    value: -18,
    param: 'temperature'
  },
  desc,
  flavor: 'Photosynthesizing bacteria specializing in extreme environments',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🦠',
  layout: (
    <div className="flex">
      <div className="col-1 middle">
        <Production>
          <Resource name="plant" />
        </Production>
      </div>
      <div className="col-4 middle">
        <div className="description">{desc}</div>
      </div>
    </div>
  )
});
