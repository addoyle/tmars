import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit,
  Tile
} from '../../../client/game/components/assets/Assets';

// TODO ACTION

const activeDesc =
  'Action: Spend 1 energy to gain 1 M€ for each city tile ON MARS';

export default new Active({
  number: 7,
  title: 'Martian Rails',
  cost: 13,
  tags: ['building'],
  activeDesc,
  flavor: 'Fast and cheap transportation for goods and guys',
  emoji: '🚝',
  todo: true,
  activeLayout: (
    <div>
      <div className="center text-center">
        <div className="resources">
          <Resource name="power" />
          <span className="arrow" />
          <MegaCredit value="1" />/
          <Tile name="city" anyone />*
        </div>
        <div className="description text-center">{activeDesc}</div>
      </div>
    </div>
  ),
  layout: <div className="m-top m-bottom" />
});
