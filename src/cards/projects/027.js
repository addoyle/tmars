import React from 'react';
import Event from '../../components/Event';
import VictoryPoint from '../../components/assets/VictoryPoint';

const desc = 'Requires 5 science tags.';

export default new Event({
  number: 27,
  title: 'Interstellar Colony Ship',
  cost: 24,
  tags: ['earth', 'space', 'event'],
  set: 'corporate',
  restriction: {
    value: 5,
    tag: 'science'
  },
  desc,
  flavor: 'To new horizons and an unknown galaxy',
  clientAction: game => {},
  serverAction: game => {},
  emoji: '🚀',
  layout: (
    <div className="flex">
      <div className="col-4 description text-center middle">{desc}</div>
      <div className="col-1">
        <VictoryPoint>
          <span className="big point">4</span>
        </VictoryPoint>
      </div>
    </div>
  )
});
