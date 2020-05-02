import React from 'react';
import Active from '../Active';
import { Resource } from '../../../client/game/components/assets/Assets';

const activeDesc = 'Action: Add a microbe to ANOTHER card.';
const desc = 'Requires -14°C or warmer.';

export default new Active({
  number: 133,
  title: 'Symbiotic Fungus',
  cost: 4,
  tags: ['microbe'],
  restriction: {
    value: -14,
    param: 'temperature'
  },
  activeDesc,
  desc,
  flavor: 'Creating mutually beneficial conditions',
  clientAction: () => {},
  serverAction: () => {},
  emoji: '🍄',
  activeLayout: (
    <div className="text-center">
      <div className="resources">
        <span className="arrow" />
        <Resource name="microbe" />*
      </div>
      <div className="description">{activeDesc}</div>
    </div>
  ),
  layout: <div className="description text-center m-top m-bottom">{desc}</div>
});
