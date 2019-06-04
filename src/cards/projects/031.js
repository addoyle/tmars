import React from 'react';
import Active from '../../components/Active';
import Resource from '../../components/assets/Resource';
import MegaCredit from '../../components/assets/MegaCredit';
import Tag from '../../components/assets/Tag';

const top_desc = 'Effect: When you play a space event, you gain 3 M€ and 3 heat.';

export default new Active({
  number: 31,
  title: 'Optimal Aerobraking',
  cost: 7,
  tags: ['space'],
  top_desc,
  flavor: 'Perfecting the art of ballistical and material analysis can increase efficiency and save money',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🛸',
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
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="m-top m-bottom" />
  )
});
