import React from 'react';
import Active from '../Active';
import {
  Resource,
  Tag,
  MegaCredit
} from '../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Add a microbe to this card. Effect: When paying for a plant card, microbes here may be used as 2 M€ each.';
const desc = 'Requires temperature -20°C or colder.';

export default new Active({
  number: 'P39',
  title: 'Psychrophiles',
  cost: 2,
  tags: ['microbe'],
  set: 'prelude',
  restriction: {
    value: -20,
    param: 'temperature',
    max: true
  },
  activeDesc,
  desc,
  flavor: 'Cold-loving bacteria, preparing the ground for the new ecosystem',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🦠',
  activeLayout: (
    <div>
      <div className="resources text-center">
        <span className="arrow" />
        <Resource name="microbe" />
      </div>
      <div className="resources text-center">
        <Tag name="plant" />:<Resource name="microbe" />=
        <MegaCredit value="2" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div className="text-center m-top m-bottom">{desc}</div>
});
