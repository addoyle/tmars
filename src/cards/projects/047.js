import React from 'react';
import Automated from '../../components/Automated';
import Resource from '../../components/assets/Resource';
import Production from '../../components/assets/Production'

const desc = 'Requires 5 ocean tiles. Gain 1 plant and increase your plant production 2 steps.';

export default new Automated({
  number: 47,
  title: 'Algae',
  cost: 10,
  tags: ['plant'],
  restriction: {
    value: 5,
    tile: 'ocean'
  },
  desc,
  flavor: 'Basic photosynthesizers in aqueous environments',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🧪',
  layout: (
    <div>
      <div className="flex">
        <div className="col-1" />
        <div className="col-1 resources middle">
          <Resource name="plant" />
        </div>
        <div className="col-1 middle">
          <Production>
            <div className="flex">
              <Resource name="plant" />
              <Resource name="plant" />
            </div>
          </Production>
        </div>
        <div className="col-1" />
      </div>
      <div className="description text-center m-top">{desc}</div>
    </div>
  )
});
