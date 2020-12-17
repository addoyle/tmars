import React from 'react';
import Active from '../Active';
import { Resource, Param } from '../../../client/game/components/assets/Assets';

const activeDesc =
  'Action: Add 1 floater to this card, or remove 2 floaters here to raise Venus 1 step.';
const desc = 'Add 3 floaters to this card.';

export default new Active({
  number: 223,
  title: 'Extractor Balloons',
  cost: 21,
  tags: ['venus'],
  set: 'venus',
  activeDesc,
  desc,
  flavor:
    'Processing the atmosphere, sealing small packs of useful materials to the surface',
  action: () => (this.resources = 3),
  emoji: '🎈',
  todo: true,
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell middle"></div>
          <div className="cell middle resources">
            <span className="arrow" />
          </div>
          <div className="cell middle resources text-center">
            <Resource name="floater" />
          </div>
        </div>
        <div className="row">
          <div className="cell middle resources">
            <span>OR</span>
            <Resource name="floater" />
            <Resource name="floater" />
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
  layout: (
    <div className="flex">
      <div className="col-1">
        <div className="resources">
          <Resource name="floater" />
          <Resource name="floater" />
          <Resource name="floater" />
        </div>
      </div>
      <div className="description middle">{desc}</div>
    </div>
  )
});
