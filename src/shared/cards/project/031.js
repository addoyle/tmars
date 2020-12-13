import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit,
  Tag
} from '../../../client/game/components/assets/Assets';

// TODO ACTION

const activeDesc =
  'Effect: When you play a space event, you gain 3 M€ and 3 heat.';

export default new Active({
  number: 31,
  title: 'Optimal Aerobraking',
  cost: 7,
  tags: ['space'],
  activeDesc,
  flavor:
    'Perfecting the art of ballistical and material analysis can increase efficiency and save money',
  action: () => {},
  emoji: '🛸',
  todo: true,
  activeLayout: (
    <div>
      <div className="resources text-center">
        <Tag name="space" />
        <Tag name="event" />:
        <MegaCredit value="3" />
        <Resource name="heat" />
        <Resource name="heat" />
        <Resource name="heat" />
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div className="m-top m-bottom" />
});
