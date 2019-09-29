import React from 'react';
import Active from '../../client/components/Active';
import { Resource } from '../../client/components/assets/Assets';

const top_desc = 'Action: Add a microbe to ANOTHER card.';
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
  top_desc,
  desc,
  flavor: 'Creating mutually beneficial conditions',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🍄',
  activeLayout: (
    <div className="text-center">
      <div className="resources">
        <span className="arrow" />
        <Resource name="microbe" />*
      </div>
      <div className="description">{top_desc}</div>
    </div>
  ),
  layout: (
    <div className="description text-center m-top m-bottom">{desc}</div>
  )
});
