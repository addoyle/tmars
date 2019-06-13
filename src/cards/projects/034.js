import React from 'react';
import Active from '../../client/components/Active';
import { Resource, Param } from '../../client/components/assets/Assets';

const top_desc = 'Action: Add 1 microbe to this card, or remove 2 microbes to raise temperature 1 step.';
const desc = 'Requires 4% oxygen.';

export default new Active({
  number: 34,
  title: 'GHG Producing Bacteria',
  cost: 8,
  tags: ['science', 'microbe'],
  restriction: {
    value: 4,
    param: 'oxygen'
  },
  top_desc,
  desc,
  flavor: 'Working for the biosphere and the atmosphere at the same time',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🦠',
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell middle"></div>
          <div className="cell middle resources">
            <div><span className="arrow" /></div>
          </div>
          <div className="cell middle resources text-center">
            <div><Resource name="microbe" /></div>
          </div>
        </div>
        <div className="row">
          <div className="cell middle resources">
            <span>OR</span>
            <Resource name="microbe" />
            <Resource name="microbe" />
          </div>
          <div className="cell middle resources">
            <div><span className="arrow" /></div>
          </div>
          <div className="cell middle resources text-center">
            <div><Param name="temperature" /></div>
          </div>
        </div>
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="m-top m-bottom description text-center">{desc}</div>
  )
});
