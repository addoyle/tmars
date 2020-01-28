import React from 'react';
import Automated from '../../client/components/cards/Automated';
import { Production, Resource, MegaCredit } from '../../client/components/assets/Assets';

const desc = 'Decrease your heat production any number of steps and increase your M€ production the same number of steps';

export default new Automated({
  number: 152,
  title: 'Insulation',
  cost: 2,
  tags: [],
  desc,
  flavor: 'Better insulation means lower energy spending',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🧥',
  layout: (
    <div className="text-center">
      <Production>
        <div className="flex">
          <span className="middle">-x</span>
          <Resource name="heat" />
          <span className="middle">+</span>
          <MegaCredit value="X" />
        </div>
      </Production>
      <div className="description m-bottom m-top">{desc}</div>
    </div>
  )
});
