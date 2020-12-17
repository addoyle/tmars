import React from 'react';
import Automated from '../Automated';

const desc =
  'After being played, when you perform an action, the wild tag counts as any tag of your choice.';

// TODO do tags checks across the board

export default new Automated({
  number: 'P40',
  title: 'Research Coordinator',
  cost: 4,
  tags: ['any'],
  set: 'prelude',
  desc,
  flavor:
    'By combining different competences, many projects may benefit in new ways',
  emoji: '👩‍🔬',
  todo: true,
  layout: <div className="text-center m-top m-bottom">{desc}</div>
});
