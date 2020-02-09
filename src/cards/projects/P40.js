import React from 'react';
import Automated from '../Automated';
import { Tile, VictoryPoint, Tag } from '../../client/components/assets/Assets';

const desc = 'After being played, when you perform an action, the wild tag counts as any tag of your choice.';

export default new Automated({
  number: 'P40',
  title: 'Research Coordinator',
  cost: 4,
  tags: ['any'],
  set: 'prelude',
  desc,
  flavor: 'By combining different competences, many projects may benefit in new ways',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '👩‍🔬',
  layout: (
    <div className="text-center m-top m-bottom">{desc}</div>
  )
});
