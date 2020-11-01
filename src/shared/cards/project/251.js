import React from 'react';
import Active from '../Active';
import {
  Resource,
  MegaCredit
} from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Add 1 microbe to this card, or spend any number of microbes here to gain the triple amount of M€.';
const desc = 'Requires Venus 6%.';

export default new Active({
  number: 251,
  title: 'Sulphur-Eating Bacteria',
  cost: 6,
  tags: ['venus', 'microbe'],
  set: 'venus',
  restriction: {
    value: 6,
    param: 'venus'
  },
  activeDesc,
  desc,
  flavor: 'Converting it into useful materials',
  action: () => {},
  emoji: '🦠',
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell" />
          <div className="cell middle resources">
            <span className="arrow" />
            <Resource name="microbe" />
          </div>
        </div>
        <div className="row">
          <div className="cell middle resources">
            <span>OR X</span>
            <Resource name="microbe" />
          </div>
          <div className="cell middle resources">
            <span className="arrow" />
            <MegaCredit value="3X" />
          </div>
        </div>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div className="description text-center m-top m-bottom">{desc}</div>
});
