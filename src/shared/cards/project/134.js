import React from 'react';
import Active from '../Active';
import { Resource } from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Gain 1 plant or add 2 microbes to ANOTHER card.';
const desc = 'It must be -10°C or colder.';

export default new Active({
  number: 134,
  title: 'Extreme-Cold Fungus',
  cost: 13,
  tags: ['microbe'],
  restriction: {
    max: true,
    value: -10,
    param: 'temperature'
  },
  activeDesc,
  desc,
  flavor:
    'Adapted strains able to form symbiotic relationships with other organisms',
  emoji: '🍄️',
  todo: true,
  activeLayout: (
    <div>
      <div className="table center">
        <div className="row">
          <div className="cell middle"></div>
          <div className="cell middle resources">
            <span className="arrow" />
          </div>
          <div className="cell middle resources">
            <Resource name="plant" />
          </div>
        </div>
        <div className="row">
          <div className="cell middle resources">
            <span>OR</span>
          </div>
          <div className="cell middle resources">
            <span className="arrow" />
          </div>
          <div className="cell middle resources">
            <Resource name="microbe" />
            <Resource name="microbe" />*
          </div>
        </div>
      </div>
      <div className="description text-center">{activeDesc}</div>
    </div>
  ),
  layout: <div className="description text-center m-top m-bottom">{desc}</div>
});
