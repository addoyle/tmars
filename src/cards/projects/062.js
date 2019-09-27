import React from 'react';
import Event from '../../client/components/Event';
import { Resource } from '../../client/components/assets/Assets';

const desc = 'Gain 5 steel.';

export default new Event({
  number: 62,
  title: 'Mineral Deposit',
  cost: 5,
  tags: ['event'],
  set: 'corporate',
  desc,
  flavor: 'Still mostly untouched, Mars offers easy access to many useful minerals',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🧱',
  layout: (
    <div>
      <div className="text-center">
        <div className="resources">
          <span>5</span>
          <Resource name="steel" />
        </div>
      </div>
      <div className="description text-center">{desc}</div>
    </div>
  )
});