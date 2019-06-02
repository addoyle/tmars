import React from 'react';
import Active from '../../components/Active';
import Resource from '../../components/assets/Resource';
import MegaCredit from '../../components/assets/MegaCredit';
import Tile from '../../components/assets/Tile';

const top_desc = 'Action: Spend 1 energy to gain 1 M€ for each city tile ON MARS';

export default new Active({
  number: 7,
  title: 'Martian Rails',
  cost: 13,
  tags: ['building'],
  top_desc,
  flavor: 'Fast and cheap transportation for goods and guys',
  clientEffect: game => {},
  serverEffect: game => {},
  emoji: '🚝',
  activeLayout: (
    <div>
      <div className="center text-center">
        <div className="resources">
          <Resource name="power" /> <span className="arrow" /> <MegaCredit value="1" /> / <Tile name="city" anyone />*
        </div>
        <div className="description text-center">{top_desc}</div>
      </div>
    </div>
  ),
  layout: (
    <div className="m-top m-bottom" />
  )
});
