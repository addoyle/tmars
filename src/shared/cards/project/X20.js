import React from 'react';
import Event from '../Event';
import { Resource } from '../../../client/game/components/assets/Assets';

const desc =
  'Requires that you have 9 different types of resources. Raise your TR 1 step.';

export default new Event({
  number: 'X20',
  title: 'Diversity Support',
  cost: 1,
  tags: ['event'],
  set: 'promo',
  restriction: {
    value: 9,
    resource: 'all'
  },
  desc,
  flavor:
    'Being able to supply a wide variety of products makes you a go-to partner for the World Government',
  tr: 1,
  emoji: '🤝',
  todo: true,
  layout: (
    <div className="flex m-bottom">
      <div className="col-2 text-center">
        <div className="resources">
          <Resource name="tr" />
        </div>
      </div>
      <div className="col-5 description">{desc}</div>
    </div>
  )
});
