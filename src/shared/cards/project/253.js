import React from 'react';
import Active from '../Active';
import { Resource, Param } from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Add 1 microbe to ANY VENUS CARD, or spend 2 microbes here to raise Venus 1 step.';
const desc = 'Requires Venus 6%.';

export default new Active({
  number: 253,
  title: 'Thermophiles',
  cost: 9,
  tags: ['venus', 'microbe'],
  set: 'venus',
  restriction: {
    value: 6,
    param: 'venus'
  },
  activeDesc,
  desc,
  flavor: 'Thriving in the extreme heat, doing your work for you',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🥵',
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell" />
          <div className="cell middle resources">
            <span className="arrow" />
          </div>
          <div className="cell middle resources text-center">
            <Resource name="microbe" tag="venus" />
          </div>
        </div>
        <div className="row">
          <div className="cell middle resources">
            <span>OR X</span>
            <Resource name="microbe" />
            <Resource name="microbe" />
          </div>
          <div className="cell middle resources">
            <span className="arrow" />
          </div>
          <div className="cell middle resources text-center">
            <Param name="venus" />
          </div>
        </div>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div className="description text-center m-top m-bottom">{desc}</div>
});
