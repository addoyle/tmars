import React from 'react';
import Event from '../../client/components/Event';
import { MegaCredit, VictoryPoint } from '../../client/components/assets/Assets';

const desc = 'The next card you play this generation costs 8 M€ less.';

export default new Event({
  number: 195,
  title: 'Indentured Workers',
  cost: 0,
  tags: ['event'],
  set: 'corporate',
  desc,
  flavor: 'There are many who would work for us for almost no pay in exchange for a ticket to Mars',
  clientAction: game => {},
  serverAction: game => {},
  vp: -1,
  emoji: '👷',
  layout: (
    <div className="flex gutter">
      <div className="col-3 center middle text-center">
        <div className="resources">
          <span>NEXT CARD:</span><MegaCredit value="-8" />
        </div>
        <div className="description m-top">{desc}</div>
      </div>
      <div className="col-1 bottom">
        <VictoryPoint>
          <span className="big point">-1</span>
        </VictoryPoint>
      </div>
    </div>
  )
});