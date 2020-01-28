import React from 'react';
import Active from '../../client/components/cards/Active';
import { Resource, Param } from '../../client/components/assets/Assets';

const top_desc = 'Action: Add 1 microbe to this card, or remove 2 microbes from this card to raise oxygen level 1 step.';

export default new Active({
  number: 33,
  title: 'Regolith Eaters',
  cost: 13,
  tags: ['science', 'microbe'],
  top_desc,
  flavor: 'Living on the rocks and excreting oxygen',
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
            <div><Param name="oxygen" /></div>
          </div>
        </div>
      </div>
      <div className="description text-center">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="m-top m-bottom" />
  )
});
